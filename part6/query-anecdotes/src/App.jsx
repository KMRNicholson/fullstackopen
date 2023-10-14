import { useQuery,  useMutation, useQueryClient  } from '@tanstack/react-query'

import anecdoteService from './services/Anecdotes'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const updatedAnecdoteMutation = useMutation(anecdoteService.updateExisting, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => updatedAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

  const anecdotes = result.data

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