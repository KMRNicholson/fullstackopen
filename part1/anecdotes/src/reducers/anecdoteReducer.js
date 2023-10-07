import _ from 'lodash'

const anecdoteList = [ 
  {
    content: 'If it hurts, do it more often.',
    votes: 0
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0
  },
  {
    content: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0
  },
  {
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0
  },
  {
    content: 'Premature optimization is the root of all evil.',
    votes: 0
  },
  {
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0
  },
  {
    content: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 0
  },
  {
    content: 'The only way to go fast, is to go well.',
    votes: 0
  }
]

const rand = () => Math.floor(Math.random() * anecdoteList.length)

const initialState = {
  anecdoteOfTheDay: anecdoteList[rand()],
  anecdotes: anecdoteList
}

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return {
        anecdoteOfTheDay: state.anecdoteOfTheDay.content === action.payload.content ? action.payload : state.anecdoteOfTheDay,
        anecdotes: state.anecdotes.map(anecdote => anecdote.content === action.payload.content ? action.payload : anecdote)
      }
    
    case 'NEXT':
      return {
        anecdoteOfTheDay: anecdoteList[rand()],
        anecdotes: state.anecdotes
      }
  
    default:
      return state
  }
}

export const voteAnecdote = anecdote => {
  return {
    type: 'VOTE',
    payload: {
      content: anecdote.content,
      votes: ++anecdote.votes
    }
  }
}

export const nextAnecdote = () => {
  return {
    type: 'NEXT'
  }
}

export default anecdoteReducer
