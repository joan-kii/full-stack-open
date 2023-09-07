const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid');

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_root, args) => {
      if (Object.keys(args).length === 0) return books
      if (args.author) return books.filter((book) => book.author === args.author)
      if (args.genre) return books.filter((book) => book.genres.find((genre) => genre === args.genre))
    },
    allAuthors: () => {
      return authors.map((author) => {
        const bookCount = books.filter((book) => book.author === author.name).length
        return {...author, bookCount}
      })
    }
  },
  Mutation: {
    addBook: (_root, args) => {
      const newBook = { ...args, id: uuid() }
      console.log(newBook);
      books = books.concat(newBook)

      if (!authors.find((author) => author.name === args.author)) {
        const newAuthor = {
          name: args.author,
          id: uuid()
        }
        authors = authors.concat(newAuthor)
      }

      return newBook
    },
    editAuthor: (_root, args) => {
      const author = authors.find((author) => author.name === args.name)
      
      if (author) {
        const newAuthor = { ...author, born: args.setBornTo }
        authors = authors.map((a) => a.name === newAuthor.name ? newAuthor : a)
        return newAuthor
      }

      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
