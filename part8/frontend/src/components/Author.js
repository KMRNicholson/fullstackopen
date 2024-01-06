import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'

import { EDIT_AUTHOR } from '../graphql/mutations'

const Author = ({author, refetchAuthors}) => {
  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: refetchAuthors } ]
  })

  const [editMode, setEditMode] = useState(false)
  const [birthyear, setBirthyear] = useState(author.born)

  const save = async () => {
    editAuthor({variables:{name: author.name, setBornTo: Number(birthyear)}})
    setEditMode(!editMode)
  }

  const edit = () => setEditMode(!editMode)

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      alert('error updating author')
    }
  }, [result.data])

  const defaultView = 
    <tr key={author.name}>
      <td>{author.name}</td>
      <td>{author.born}</td>
      <td>{author.bookCount}</td>
      <td>
        <button onClick={edit} type="button">
          edit
        </button>
      </td>
    </tr>

  const editView = 
    <tr key={author.name}>
      <td>{author.name}</td>
      <td>
        <input
          value={birthyear}
          onChange={({ target }) => setBirthyear(target.value)}
        />
      </td>
      <td>{author.bookCount}</td>
      <td>
        <button onClick={save} type="button">
          save
        </button>
      </td>
      <td>
        <button onClick={edit} type="button">
          cancel
        </button>
      </td>
    </tr>

  return editMode ? editView : defaultView
}

export default Author
