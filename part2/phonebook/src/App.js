import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const personExists = persons.filter(person => person.name === newName).length > 0

    if(personExists){
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    const newId = persons[persons.length-1].id + 1
    const newPerson = { name: newName, number: newNumber, id: newId }
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
  const handleFilterChange = (event) => setFilter(event.target.value)

  const filtered = filter.length > 0 
    ? persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeHandler={handleFilterChange} value={filter}/>
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={filtered}/>
    </div>
  )
}

export default App