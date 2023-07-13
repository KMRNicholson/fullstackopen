const Person = ({name, number}) => <div>{name} {number}</div>

const Persons = ({persons}) => persons.map(person => <Person key={person.id} name={person.name} number={person.number}/>)

export default Persons