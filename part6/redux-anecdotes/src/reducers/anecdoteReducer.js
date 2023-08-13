import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (content) => {
  return {
    content,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.payload)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addAnecdote(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}

// Seguir aquí exercise 6.18
/* export const addVote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updeteAnecdote(id)
    dispatch(appendAnecdote(updatedAnecdote))
  }
} */

export default anecdoteSlice.reducer
