import axios from 'axios'
const baseUrl = 'https://api.weatherapi.com/v1/current.json'
const apiKey = process.env.REACT_APP_WEATHER_API_KEY

const get = (latitude, longitude) => {
	const parameters = `key=${apiKey}&q=${latitude},${longitude}`
  const url = `${baseUrl}?${parameters}`
  const request = axios.get(url)
  return request.then(response => response.data)
}

const weatherForecastService = { get }

export default weatherForecastService