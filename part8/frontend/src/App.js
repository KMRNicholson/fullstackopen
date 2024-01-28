import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import FavoriteBooks from './components/FavoriteBooks'

import { ALL_BOOKS } from './graphql/queries'
import { BOOK_ADDED } from './graphql/subscriptions'

const Home = () => <div>Welcome to the library app!</div>

const NavBar = ({logout}) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <div>
        <Link to='/' style={padding}>home</Link>
        <Link to='/authors' style={padding}>authors</Link>
        <Link to='/books' style={padding}>books</Link>
        <Link to='/books/add' style={padding}>add book</Link>
        <Link to='/favorite-books' style={padding}>recommendations</Link>
        <button onClick={()=>logout()} style={padding}>logout</button>
      </div>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/favorite-books' element={<FavoriteBooks />} />
        <Route path='/books/add' element={<NewBook />} />
      </Routes>
    </div>
  )
}


const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const book = data.data.bookAdded
      alert(`Book was added: ${book.title}`)
      client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre: "" } }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(book)
        }
      })
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <LoginForm setToken={setToken} />
      </>
    )
  }

  return (
    <Router>
      <NavBar logout={logout} />
    </Router>
  )
}

export default App
