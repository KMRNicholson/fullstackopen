import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const url = `${baseUrl}/all`
  const request = axios.get(url)
  return request.then(response => response.data)
}

const get = (name) => {
  const url = `${baseUrl}/${name}`
  const request = axios.get(url)
  return request.then(response => response.data)
}

const countriesService = { getAll, get }

export default countriesService