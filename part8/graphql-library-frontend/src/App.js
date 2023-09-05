import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {

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
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/newbook" element={<NewBook />} />
      </Routes>
    </Router>
  )
}

export default App
