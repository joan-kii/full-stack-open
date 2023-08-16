import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getData = () => 
  axios.get(baseUrl)
    .then(res => res.data)

export const createAnecdote = (anecdote) => {
  axios.post(baseUrl, anecdote)
    .then(res => res.data)
}

export const updateAnecdote = (updatedAnecdote) => {
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(res => res.data)
}
