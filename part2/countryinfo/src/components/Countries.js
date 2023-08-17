import { useCallback, useEffect, useState } from "react"
import WeatherForecast from "./WeatherForecast"

import weatherForecastService from '../services/WeatherForecast'
const Country = ({country}) => {
  const [wind, setWind] = useState('')
  const [temperature, setTemperature] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageText, setImageText] = useState('')
  const [location, setLocation] = useState('')

  const languages = []
  for(const key in country.languages){
    languages.push(country.languages[key])
  }

  const latitude = country.latlng[0]
  const longitude = country.latlng[1]

  useEffect(() => {
    weatherForecastService
      .get(latitude, longitude)
      .then(weatherData => {
        const current = weatherData.current
        const location = weatherData.location

        setWind(current.wind_kph)
        setTemperature(current.temp_c)
        setImageUrl(current.condition.icon)
        setImageText(current.condition.text)
        setLocation(location.name)
      })
      .catch((error) => console.log(error))
  },[latitude, longitude])

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
      <WeatherForecast wind={wind} temperature={temperature} imageUrl={imageUrl} imageText={imageText} location={location}/>
    </div>
  )
}

const Countries = ({countries}) => {
  const [countryList, setCountryList] = useState([])

  const handleShow = useCallback((countryName) => () => {
    const selectedCountry = countries.map(country => {
      if(country.name.common === countryName) 
        return <Country key={country.name.common} country={country}/>
      else
        return ''
    })

    setCountryList(selectedCountry)
  }, [countries])

  useEffect(() => {
    const newList = []
    if(countries.length === 1) {
      newList.push(<Country key={countries[0].name.common} country={countries[0]}/>)
    }else{
      for(const index in countries){
        const country = countries[index]
        newList.push(<div key={country.name.common}>{country.name.common} <button onClick={handleShow(country.name.common)}>show</button></div>)
      }
    }
    setCountryList(newList)
  }, [countries, handleShow])

  return countryList
}

export default Countries