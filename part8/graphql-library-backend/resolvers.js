const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allGenres: async () => {
      const books = await Book.find({})
      let rawGenres = []
      for (const book of books) {
        rawGenres = rawGenres.concat(book.genres)
      }
      const genres = new Set(rawGenres)
      return genres
    },
    allBooks: async (_root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author }) 
        const books = await Book.find({ author: author._id }).populate('author')
        return books
      }
      if (args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre]}}).populate('author')
        return books
      }
      const books = await Book.find({}).populate('author')
      return books
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
    },
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      } else {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
  
          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            }) 
          }
        }
        const newBook = new Book({ ...args, author: author._id })
  
        try {
          await newBook.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          }) 
        }

        const bookAdded = newBook.populate('author')
        
        pubsub.publish('BOOK_ADDED', { bookAdded })
        
        return bookAdded
      }
    },
    editAuthor: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
      return author
    },
    createUser: async (_root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre
      })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  }
}

module.exports = resolvers
