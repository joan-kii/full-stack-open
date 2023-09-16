const Recommendation = ({ user, books }) => {

  if (books.loading || user.loading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <h3>{`Books in your favourite genre: ${user.data?.me?.favouriteGenre}`}</h3>
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
    </div>
  )
}

export default Recommendation
