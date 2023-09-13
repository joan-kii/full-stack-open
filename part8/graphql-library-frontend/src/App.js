import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/client'
import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendation from './components/Recommendation'
import { ALL_AUTHORS, ME } from './queries'

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const user = useQuery(ME)
  
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [errorMessage, setErrorMessage] = useState('')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <Router>
      <div>
        <Link to="/">
          <button type="button">Authors</button>
        </Link>
        <Link to="/books">
          <button type="button">Books</button>
        </Link>
        {!token &&
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        }
        {token &&
          <>
            <Link to="/newbook">
              <button type="button">New Book</button>
            </Link>
            <Link to="/recommendation">
              <button type="button">Recommendations</button>
            </Link>
            <button type="button" onClick={logout}>Logout</button>
          </>
        }
        <Notify errorMessage={errorMessage} />
      </div>

      <Routes>
        <Route path="/" element={<Authors authors={authors} token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/recommendation" element={<Recommendation user={user} />} />
        <Route path="/newbook" element={token ? <NewBook /> : <Authors authors={authors} token={token} /> } />
        <Route path="/login" element={<LoginForm setToken={setToken} setErrorMessage={notify} />} />
      </Routes>
    </Router>
  )
}

export default App
