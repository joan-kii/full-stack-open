const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid');

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to MongoDB');

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
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
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
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      if (Object.keys(args).length === 0) return await Book.find({}).populate('author')
      if (args.author) {
        const author = await Author.findOne({ name: args.author }) 
        const books = await Book.find({ author: author._id }).populate('author')
        return books
      }
      if (args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre]}}).populate('author')
        return books
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      return authors.map((author) => {
        let bookCount = 0
        for (const book of books) {
          if (book.author.name === author.name) bookCount += 1
        }
        return { ...author._doc, bookCount }
      })
    }
  },
  Mutation: {
    addBook: async (_root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const newBook = new Book({ ...args, author: author._id })
      await newBook.save()
      return newBook
    },
    editAuthor: async (_root, args) => {
      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })

      return author
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
