import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

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
        <button onClick={()=>logout()} style={padding}>logout</button>
      </div>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/add' element={<NewBook />} />
      </Routes>
    </div>
  )
}


const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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
