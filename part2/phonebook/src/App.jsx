import { useState } from 'react'
import Person from './components/Person.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearch] = useState('')

  const handleNumber = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleName = (event)=>{
    setNewName(event.target.value)
  }

  const handleSearch = (event)=>{
    setSearch(event.target.value)
  }



  const addName = (event) => {
    event.preventDefault()

    //check if name is already added
    if(nameExists()){
      console.log(`${newName} is already added to phonebook`)
    }
    else{
      const newObject = {
        name:newName,
        id: persons.length + 1,
        number: newNumber
      }
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const nameExists = () => {

    persons.forEach((person)=>{
      if(person.name == newName)
        return true
    })
    return false
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <h2>Search</h2>
      <p>filter by name: </p><input value={searchValue} onChange={handleSearch} />

      <h2>Add a Contact</h2>
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      
      {persons.map(person => 
        <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App