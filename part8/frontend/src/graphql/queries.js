import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String!){
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`