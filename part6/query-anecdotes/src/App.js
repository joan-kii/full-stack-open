import { useQuery, useMutation, useQueryClient } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getData, updateAnecdote } from './services/request'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      //seguir aquí
      console.log(anecdotes);
      const anecdoteToUpdate = anecdotes.find(item => {
        if item.id === anecdote.id
      })
      console.log(anecdoteToUpdate);
      queryClient.setQueryData(['anecdotes', { id: anecdote.id }], {
        ...anecdote, votes: anecdote.votes + 1
      })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const getAnecdotes = useQuery('anecdotes', getData, { 
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (getAnecdotes.isLoading) {
    return <div>Loading data...</div>
  } 
  
  if (getAnecdotes.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = getAnecdotes.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
