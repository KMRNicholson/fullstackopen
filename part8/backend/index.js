const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
  
const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allBooks(author: String, genre: String): [Book]
    favoriteBooks: [Book]
    bookCount: Int
    allAuthors: [Author]
    allUsers: [User]
    authorCount: Int
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author", {
        name: 1,
        born: 1,
        id: 1,
      });
      
      if(args.author && args.genre){
        return books.filter(book => book.author.name === args.author && book.genres.includes(args.genre))
      }

      if(args.author){
        return books.filter(book => book.author.name === args.author)
      }

      if(args.genre){
        return books.filter(book => book.genres.includes(args.genre))
      }

      return books;
    },
    favoriteBooks: async (root, args, context) => {
      const books = await Book.find({}).populate("author", {
        name: 1,
        born: 1,
        id: 1,
      });

      return books.filter(book => book.genres.includes(context.currentUser.favoriteGenre))
    },
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    allAuthors: async () => await Author.find({}),
    allUsers: async () => await User.find({}),
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    name: (root) => root.name,
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author", {
        name: 1,
        born: 1,
        id: 1,
      });
      
      return books.filter(book => book.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized', {
          extensions: {
            code: 'UNAUTHORIZED'
          }
        })
      }
      
      try {
        let author = await Author.findOne({name: args.author})

        if (!author) {
          author = await new Author({name: args.author}).save()
        }

        const book = new Book({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres
        })

        const savedBook = await book.save()
        const response = await Book.findOne({_id: savedBook._id}).populate("author", {
          name: 1,
          id: 1,
        })

        return response
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'VALIDATION_FAILED',
            error
          }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized', {
          extensions: {
            code: 'UNAUTHORIZED'
          }
        })
      }

      try {
        const author = await Author.findOne({ name: args.name });

        if (!author) {
          return null
        }

        await Author.updateOne({ _id: author._id }, { name: args.name, born: args.setBornTo }, { runValidators: true });

        return await Author.findOne({ name: args.name });
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'VALIDATION_FAILED',
            error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})