import { useSelector, useDispatch } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) => {
      if (anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
        return anecdote
      }
      return null
    })
  })

  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(addVote(id))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList