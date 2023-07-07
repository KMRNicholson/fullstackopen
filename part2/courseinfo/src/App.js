const Header = (props) => 
  <h1>
    {props.courseName}
  </h1>

const Part = (props) => 
  <p>
    {props.name} {props.exercises}
  </p>

const Content = (props) => props.parts.map((element, index) => 
  <Part key={index} name={element.name} exercises={element.exercises}/>
)

const Total = (props) => 
  <p>
    Number of exercises {props.parts.map(part => part.exercises).reduce((sum, exercises) => sum + exercises, 0)}
  </p>

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
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
