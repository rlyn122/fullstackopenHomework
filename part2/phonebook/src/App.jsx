import { useState, useEffect } from 'react'
import PersonService from './services/persons.js'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Notification from './components/Notification'
import { Display } from 'phaser'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearch] = useState('')
  const [notice, setNotification] = useState(' ')
  useEffect(() => {
    console.log('effect')
    PersonService
      .getAll()
      .then(initialData => {
        console.log('promise fulfilled')
        setPersons(initialData)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  //checks if person has substring and returns true or false
  const hasSubstring = (name,subString) => {

    let length = subString.length
    //base case: if subString has no value then all names are valid
    if(length == 0)
      return true
    
    //find all the substrings of name starting with the first value of substring
    if(name.indexOf(subString)!=-1)
      return true
    
    return false

  }

  const Delete = (id) => {
    const name = persons.filter(person => person.id===id)[0].name
    if(window.confirm(`Delete ${name} ?`))
    {PersonService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => {
          if(person.id != id) 
            return true
          else 
            return false}))
      displayMessage(`Deleted ${name} from the book`)

      }
      )}
  }

  const handleNumber = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleName = (event)=>{
    setNewName(event.target.value)
  }

  const handleSearch = (event)=>{
    let val = event.target.value
    setSearch(val)
  }

  const addName = (event) => {
    event.preventDefault()
    const p = persons.find(person => person.name===newName)
    const changed_person = {...p, number: newNumber}

    //check if name is already added
    if(nameExists(newName)){

      //ask to replace number if names are the same
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)){
        PersonService
        .update(p.id,changed_person)
        .then(returnedP =>{
          setPersons(persons.map(person => person.id != p.id ? person : changed_person))
          displayMessage(`Changed ${returnedP.name}'s phone number to ${returnedP.number}`)
        })
        .catch(error => {
          displayMessage(
            `ERROR Person '${p.name}' was already removed from server`
          )
          setPersons(persons.filter( pers => pers.id !== p.id))
        })

      }
    }
    else{      
      const newObject = {
        name:newName,
        number: newNumber
      }

      PersonService
      .create(newObject)
      .then(response => {
        console.log(response)
        const new_p = persons.concat(response)
        setPersons(new_p)
        setNewName('')
        setNewNumber('')
        displayMessage(`Added ${response.name}`)

      })
  
    }
  }

  //show and remove message after 3 seconds
  const displayMessage = (message) => {
    setNotification(message)
        setTimeout(()=>{
          setNotification(``)
        },5000)
  }

  const nameExists = (name) => {
    let isequal = false
    persons.forEach((person)=>{
      if(person.name === (name))
        isequal = true
    })
    return isequal
  }

  const Displayed = persons.filter(person => {
    if(hasSubstring(person.name,searchValue)){
      return true
    }
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notice}/>
      <h2>Search</h2>
      <Filter searchValue={searchValue} handleSearch={handleSearch}/>

      <h2>Add a Contact</h2>
      <PersonForm addName={addName} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>

      <h2>Numbers</h2>
      
      {Displayed.map(person => 
        <Persons key={person.id} 
        person={person} 
        handleClick= {() => Delete(person.id)}
        />)}
    </div>
  )
}

export default App