const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
      </div>
  )
}

const Parts = (props) => {
  return(
    <div>
      <p>{props.part} {props.num} </p>
    </div>
  )
}

const Content = (props) => {
  let [part1,part2,part3] = props.parts
  

  return (
  <div>
    <Parts part={part1.name} num={part1.exercises}/>
    <Parts part={part2.name} num={part2.exercises}/>
    <Parts part={part3.name} num={part3.exercises}/>
  </div>
  )
}

const Total = (props) => {
  let total = (props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises)
  return (
    <div>
    <p>Number of exercises {total}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}
export default App