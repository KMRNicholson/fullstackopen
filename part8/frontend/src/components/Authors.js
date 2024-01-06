import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../graphql/queries'
import Author from './Author'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)

  if(result.loading){
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <Author author={a} refetchAuthors={ALL_AUTHORS}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
