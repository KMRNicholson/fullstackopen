import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const personsUri = 'http://localhost:3001/persons'
    axios
      .get(personsUri)
      .then(response => setPersons(response.data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const personExists = persons.filter(person => person.name === newName).length > 0

    if(personExists){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personsUri = 'http://localhost:3001/persons'
    const newPerson = { name: newName, number: newNumber }
    axios
      .post(personsUri, newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value) 
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

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
      {filter.length > 0 
        ? <Persons persons={persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))}/>
        : <Persons persons={persons}/>}
    </div>
  )
}

export default App