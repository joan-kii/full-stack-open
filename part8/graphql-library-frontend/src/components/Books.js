import { useState } from "react"
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES } from '../queries'


const Books = () => {
  const [genre, setGenre] = useState('')
  const books = useQuery(ALL_BOOKS, {
    variables: { genre }
  })
  const genres = useQuery(ALL_GENRES)

  if (books.loading || genres.loading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <h2>Books</h2>
    <h3>{genre ? `In genre ${genre[0].toUpperCase() + genre.slice(1)}` : 'All Genres'}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.data.allGenres.map((genre) => {
        return (
          <button 
            type="button"
            key={genre}
            onClick={() => setGenre(genre)} >
              {genre[0].toUpperCase() + genre.slice(1)}
          </button>
        )})
      }
      <button type="button" onClick={() => setGenre('')}>All Genres</button>
    </div>
  )
}

export default Books
