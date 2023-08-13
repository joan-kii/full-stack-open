import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeMessage, setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setMessage(`You create a new anecdote: ${content}`))
    setTimeout(() => {
      dispatch(removeMessage(''))
    }, 5000)
  }

  return (
    <form onSubmit={newAnecdote}>
      <h2>create new</h2>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm