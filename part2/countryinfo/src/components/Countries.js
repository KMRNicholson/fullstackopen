const DetailedInformation = ({country}) => {
  const languages = []
  for(const key in country.languages){
    languages.push(country.languages[key])
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} height='500' width='500'/>
    </div>
  )
}
  

const Country = ({country, handleShow, show}) => {
  return (
    <div>
      { show 
        ? <DetailedInformation country={country} />
        : country.name.common 
      }
      <button onClick={handleShow(country)}>show</button>
    </div>
  )
} 
    

const Countries = ({countries, handleShow}) => {
    if(countries.length === 1) {
      const country = countries[0]
      return <Country key={country.name.common} country={country} handleShow={handleShow} show={true}/>
    }

    return countries.map(country => <Country key={country.name.common} country={country} handleShow={handleShow} show={false}/>)
}

export default Countries