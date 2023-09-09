import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks (author: String, genre: String) {
      title
      published
      author {
        name
        born
      }
    }
  }
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
    ) {
      title
      published
      genres
      author {
        name
        born
      }
    }
  }
`

export const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $birth: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $birth
    ) {
      name
      born
    }
  }
`
