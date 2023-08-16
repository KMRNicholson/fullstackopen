const Country = ({country, handleShow}) => 
    <div>
        {country.name.common} <button onClick={handleShow(country)}>show</button> 
    </div>

const Countries = ({countries}) => {
    const handleShow = (country) => {
        console.log(country)
    }

    return countries.map(country => <Country key={country.name.common} country={country} handleShow={handleShow}/>)
}

export default Countries