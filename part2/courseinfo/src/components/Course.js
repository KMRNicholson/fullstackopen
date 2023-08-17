const Header = ({courseName}) => 
  <h2>
    {courseName}
  </h2>

const Part = ({name, exercises}) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({parts}) => parts.map(part => 
  <Part key={part.id} name={part.name} exercises={part.exercises}/>
)

const Total = ({parts}) => 
  <strong>
    total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercise(s)
  </strong>

const Course = ({course}) =>
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

export default Course