import { useQuery } from '@apollo/client'
import _ from 'lodash'

import { FAV_BOOKS } from '../graphql/queries'

import BooksList from './BooksList'

const FavoriteBooks = () => {
  const result = useQuery(FAV_BOOKS)

  if(result.loading){
    return <div>loading...</div>
  }

  const books = result.data.favoriteBooks
  const genre = _.uniq(books.reduce((list, book) => list.concat(book.genres), []))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre { genre }</p>
      <table>
        <BooksList books={books} />
      </table>
    </div>
  )
}

export default FavoriteBooks
