import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import SearchField from './components/SearchField'
import AddPersonForm from './components/AddPersonForm'
import personService from  './services/persons'


const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterStr.toLowerCase()))


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilterStr(event.target.value)
  }

  const handleAddName = (event) => {
    event.preventDefault()
    console.log(persons)
    if (persons.filter(person => person.name == newName).length > 0) {
      console.log("true");
      if (window.confirm(`${newName} is already added to phonebook, replace phone number ?`)){
        let personObject = persons.filter(person => person.name == newName)[0]
        personObject = {...personObject, number:newNumber}
        personService.update(personObject.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
        })

      }
    }
    else {
      console.log("false");
      const personObject = { name: newName, number: newNumber }
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      
    }
  }

  const handleDelete = (person) => {
    console.log("delete person")
    if (window.confirm(`Delete ${person.name}`)){
      personService.remove(person.id)
      .then(deletedPerson => {
        setPersons(persons.filter(p => p.id !== deletedPerson.id))
      })

    }


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField keyword={filterStr} handler={handleFilter} />

      <h2>Add New</h2>
      <AddPersonForm name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange} submitHandler={handleAddName} />
      <h2>Numbers</h2>
      {
        personsToShow.map(person => <Person key={person.name} person={person}  deleteHandler={() => handleDelete(person)}/>)
      }

    </div>
  )
}

export default App