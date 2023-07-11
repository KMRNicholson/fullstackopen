import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const personExists = persons.filter(person => person.name === newName).length > 0

    if(personExists){
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    const newPerson = { name: newName, number: newNumber }
    const newPersons = [
      ...persons,
      newPerson
    ]
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value) 
  const handleNumberChange = (event) => setNewNumber(event.target.value) 

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App