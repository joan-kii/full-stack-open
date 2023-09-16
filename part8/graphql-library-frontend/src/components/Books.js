import { useQuery } from '@apollo/client'

import BooksView from './BooksView'
import BooksTable from './BooksTable'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = ({ books, genre, setGenre }) => {
  const booksGenre = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  const genres = useQuery(ALL_GENRES)

  if (genres.loading || booksGenre.loading || books.loading) {
    return <p>loading...</p>
  }

  if (genre) {
    return (
      <BooksView genre={genre} setGenre={setGenre} genres={genres} >
        <BooksTable booksList={booksGenre} />
      </BooksView>
    )
  }
  
  return (
    <BooksView genre={genre} setGenre={setGenre} genres={genres} >
      <BooksTable booksList={books} />
    </BooksView>
  )
}

export default Books
