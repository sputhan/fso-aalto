import { useState } from 'react'
import Person from './components/Person'
import SearchField from './components/SearchField'
import AddPersonForm from './components/AddPersonForm'


const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')

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
      alert(`${newName} is already added to phonebook`)
    }
    else {
      console.log("false");
      setPersons(persons.concat({ name: newName, number: newNumber }))
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
        personsToShow.map(person => <Person key={person.name} person={person} />)
      }

    </div>
  )
}

export default App