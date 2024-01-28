import { useQuery } from '@apollo/client'
import _ from 'lodash'

import { ALL_BOOKS } from '../graphql/queries'
import { useState } from 'react'

import BooksList from './BooksList'

const Books = () => {
  const [genre, setGenre] = useState("")
  
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre }
  })

  if(result.loading){
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const genres = _.uniq(books.reduce((list, book) => list.concat(book.genres), []))

  return (
    <div>
      <h2>books</h2>
      <table>
        <BooksList books={books} />
      </table>
      {genres.map(genre => <button key={genre} onClick={()=>setGenre(genre)}>{genre}</button>)}<button onClick={()=>setGenre("")}>clear filter</button>
    </div>
  )
}

export default Books
