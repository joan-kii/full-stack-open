const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts.part1} exercise={props.exercises.exercises1} />
      <Part part={props.parts.part2} exercise={props.exercises.exercises2} />
      <Part part={props.parts.part3} exercise={props.exercises.exercises3} />
    </div>
  )
}

const Total = (props) => {
  let numberOfExercises = 0

  for (const [k, v] of Object.entries(props.exercises)) {
    numberOfExercises += v
  }

  return (
    <div>
      <p>Number of exercises {numberOfExercises}</p>
    </div>
  )
}


const App = () => {

  const course = 'Half Stack application development'
  const parts = {
    part1 : 'Fundamentals of React',
    part2 : 'Using props to pass data',
    part3 : 'State of a component'
  }
  const exercises = {
    exercises1 : 10,
    exercises2 : 7,
    exercises3 : 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

export default App
