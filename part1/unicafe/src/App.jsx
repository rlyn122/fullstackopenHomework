import { useState } from 'react'

const Display = ({message}) => {
  return(<div> <h1>{message}</h1> </div>)
}

const StatisticLine = ({text,value}) => {
  return(
    <table>
    {text}  {value}
    </table>
  )
}

const Statistics = ({good,neutral,bad,total}) => {

  if(total==0){
  return(
    <div>
      <p>no feedback given</p>
    </div>
  )
  }
  return(<div>
    <StatisticLine text="good" value ={good} />
    <StatisticLine text="neutral" value ={neutral} />
    <StatisticLine text="bad" value ={bad} />
    <StatisticLine text="all" value ={total} />
    <StatisticLine text="average" value ={(bad*-1+good)/total} />
    <StatisticLine text="positive" value ={good/total*100 + "%"} />
    </div>)
}

const Button = ({func,text}) =>{
  return(
    <button onClick={func}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const incrGood = () => {
    setGood(good+1)
    setTotal(total+1)
  }
  const incrNeutral = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
  }
  const incrBad = () => {
    setBad(bad+1)
    setTotal(total+1)
  }

  return (
    <div>
      <Display message="give feedback" />
      <Button func={incrGood} text="Good" />
      <Button func={incrNeutral} text="Neutral" />
      <Button func={incrBad} text="Bad" />
      <Display message="statistics" />
      <Statistics message="positive " good={good} neutral={neutral} bad={bad} total={total}/>


    </div>
  )
}

export default App