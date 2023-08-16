import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personsService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(() => alert('Failed to load persons.'))
  }, [])

  const reloadPersons = () => personsService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
    .catch(() => alert('Failed to load persons.'))

  const handleNotification = (type, message) => {
    setNotification(<Notification type={type} message={message} />)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson != undefined){
      handleExisting(existingPerson, newPerson)
    }else{
      handleNew(newPerson)
    }
  }

  const handleExisting = (existingPerson, newPerson) => {
    const confirmUpdate = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)

    if(confirmUpdate){
      personsService
        .update(existingPerson.id, newPerson)
        .then(() => {
          reloadPersons()
          handleNotification('success', `Updated ${newPerson.name}`)
        })
        .catch(() => alert('Failed to update person. Please refresh and try again.'))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNew = (newPerson) => {
    personsService
      .create(newPerson)
      .then(() => {
        reloadPersons()
        handleNotification('success', `Added ${newPerson.name}`)
      })
      .catch(() => alert('Failed to create person.'))
    
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (id) => () => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
      personsService
        .remove(id)
        .then(() => {
          reloadPersons()
          handleNotification('success', `Deleted ${person.name}`)
        })
        .catch(() => alert('Failed to delete person. Please refresh and try again.'))
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value) 
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      {notification}
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
        ? <Persons persons={persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))} handleDelete={handleDelete}/>
        : <Persons persons={persons} handleDelete={handleDelete}/>}
    </div>
  )
}

export default App