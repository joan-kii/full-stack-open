const BooksTable = ({ booksList }) => {
  return (
    <>
      {booksList.data.allBooks.map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ))}
    </>
  )
}

export default BooksTable
