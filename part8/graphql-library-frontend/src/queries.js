import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
      bookCount
    }
  }
  ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
  query allBooks ($author: String, $genre: String) {
    allBooks (author: $author, genre: $genre) {
      ...BookDetails
      author {
        ...AuthorDetails
      }
    }
  }
  ${BOOK_DETAILS}
  ${AUTHOR_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const ME = gql`
  query {
    me {
      favouriteGenre
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
      ...BookDetails
      author {
        ...AuthorDetails
      }
    }
  }
  ${AUTHOR_DETAILS}
  ${BOOK_DETAILS}
`

export const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $birth: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $birth
    ) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
      author {
        ...AuthorDetails
      }
    }
  }
  ${AUTHOR_DETAILS}
  ${BOOK_DETAILS}
`
