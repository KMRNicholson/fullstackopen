import { useQuery } from '@apollo/client'
import _ from 'lodash'

import { ALL_BOOKS } from '../graphql/queries'
import { useState } from 'react'

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
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
          {genres.map(genre => <button key={genre} onClick={()=>setGenre(genre)}>{genre}</button>)}<button onClick={()=>setGenre("")}>clear filter</button>
        </tbody>
      </table>
    </div>
  )
}

export default Books
