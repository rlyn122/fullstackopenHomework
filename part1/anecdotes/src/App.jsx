import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <div>
    <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const Title = ({text}) => {
  return(
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const randQuote = () => {
    const rand_num = Math.floor(Math.random()*(anecdotes.length))
    setSelected(rand_num)
  }   
  const vote = () => {
    const copy = [...Points]
    copy[selected] += 1
    setPoints(copy)

    //Find maximum value
    let maxV = 0
    for( let i = 0 ; i<copy.length ; i++){
      if(maxV< copy[i]) maxV = copy[i]
    }
    console.log("maxValue ",maxV)
    //find the max index 
    let max_index = 0
    let index = 0
    while(index<=copy.length){
      if(copy[index] == maxV){
        max_index = index
      }
      index += 1
    }
    console.log("max_index", max_index)
    setMax(max_index)
  }

  const [selected, setSelected] = useState(0)
  const [Points, setPoints] = useState([0,0,0,0,0,0,0,0])
  const [max, setMax] = useState(0)

  return (
    <div>
      <Title text="Anecdote of the Day!" />
      {anecdotes[selected]}
      <p>has {Points[selected]} votes</p>
      <Button handleClick={vote} text="vote"/>
      <Button handleClick={randQuote} text="randomize" />

      <Title text="Most Popular Anecdote!" />
      {anecdotes[max]}
    </div>
  )
}
export default App