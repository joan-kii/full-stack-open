import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom'
import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'
import { useState, useEffect } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendation from './components/Recommendation'
import { ALL_AUTHORS, ME, BOOK_ADDED, ALL_BOOKS } from './queries'

export const updateCache = (cache, query, bookAdded) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(bookAdded)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [errorMessage, setErrorMessage] = useState('')
  const [genre, setGenre] = useState('')
  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)
  const [loadGenreBooks, favouriteGenreBooks] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: user.data?.me?.favouriteGenre }
  })

  useEffect(() => {
    loadGenreBooks()
  },[loadGenreBooks, user.loading])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const { title, author } = data.data.bookAdded 
      updateCache(client.cache, { query: ALL_BOOKS }, data.data.bookAdded)
      for (const bookGenre of data.data.bookAdded.genres) {
        updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: bookGenre } }, data.data.bookAdded)
      }
      alert(`${title} by ${author.name} added to library!`)
    }
  })

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
        <Route path="/books" element={<Books books={books} genre={genre} setGenre={setGenre} />} />
        <Route path="/recommendation" element={<Recommendation user={user} books={favouriteGenreBooks} />} />
        <Route path="/newbook" element={token ? <NewBook user={user} /> : <Authors authors={authors} token={token} /> } />
        <Route path="/login" element={<LoginForm setToken={setToken} setErrorMessage={notify} />} />
      </Routes>
    </Router>
  )
}

export default App
