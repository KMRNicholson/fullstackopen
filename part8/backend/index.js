const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

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

  type Query {
    allBooks(author: String, genre: String): [Book]
    bookCount: Int
    allAuthors: [Author]
    authorCount: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
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
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    allAuthors: async () => await Author.find({}),
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
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
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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