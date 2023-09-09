import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  return (
    <Router>
      <div>
        <Link to="/">
          <button type="button">Authors</button>
        </Link>
        <Link to="/books">
          <button type="button">Books</button>
        </Link>
        <Link to="/newbook">
          <button type="button">New Book</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors authors={authors} />} />
        <Route path="/books" element={<Books books={books} />} />
        <Route path="/newbook" element={<NewBook />} />
      </Routes>
    </Router>
  )
}

export default App
