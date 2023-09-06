import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = ({ authors }) => {
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (authors.loading) {
    return <div>loading...</div>
  }

  const handleUpdateBirth = (e) => {
    e.preventDefault()
    updateAuthor({ variables: { name, birth }})
    setName('')
    setBirth('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleUpdateBirth}>
        <h3>Set birthyear</h3>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)} 
          />
        </div>
        <div>
          Born
          <input
            value={birth}
            onChange={({ target }) => setBirth(Number(target.value))} 
          />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
