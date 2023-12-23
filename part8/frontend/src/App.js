import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const Home = () => <div>Welcome to the library app!</div>

const NavBar = () => {
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
  return (
    <Router>
      <NavBar />
    </Router>
  )
}

export default App
