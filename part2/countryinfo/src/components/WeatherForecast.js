const WeatherForecast = ({wind, temperature, imageUrl, imageText, location}) => {
  return (
    <div>
        <h3>Weather in {location}</h3>
        <div>temperature {temperature} Celcius</div>
        <img src={imageUrl} alt={imageText} height='200' width='200'></img>
        <div>wind {wind} kph</div>
    </div>
  )
}

export default WeatherForecast