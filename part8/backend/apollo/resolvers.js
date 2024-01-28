const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const jwt = require('jsonwebtoken')

const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')

const pubsub = new PubSub()

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

        pubsub.publish('BOOK_ADDED', { bookAdded: response })

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

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers