const Header = ({courseName}) => 
  <h1>
    {courseName}
  </h1>

const Part = ({name, exercises}) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({parts}) => parts.map((element, index) => 
  <Part key={index} name={element.name} exercises={element.exercises}/>
)

const Total = ({parts}) => 
  <p>
    Number of exercises {parts.map(part => part.exercises).reduce((sum, exercises) => sum + exercises, 0)}
  </p>

const Course = ({course}) =>
  <div></div>

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
