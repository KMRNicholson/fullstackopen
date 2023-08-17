import { useState, useEffect } from 'react'

import Countries from './components/Countries'
import Filter from './components/Filter'

import countriesService from './services/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => setCountries(countries))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    const filteredResults = countries
      .filter(country => country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    
    if(filteredResults.length > 10){
      if(filter.length > 0) setFilteredCountries('Too many matches, specify another filter.')
    } else {
      setFilteredCountries(<Countries countries={filteredResults}/>)
    }
  }, [filter, countries])

  return (
    <div>
      <Filter changeHandler={handleFilterChange} value={filter}/>
      {filteredCountries}
    </div>
  )
}

export default App