const BooksView = ({
  genre,
  setGenre,
  genres,
  children
}) => {
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
          {children}
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

export default BooksView
