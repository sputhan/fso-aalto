const WeatherInfo= ({ weatherInfo }) => {

    if (weatherInfo == null){
        return null
    }

 
    return (
      <div>
        <h1>Weather in {weatherInfo.place}</h1>
        temperature {weatherInfo.temperature} Celcius <br/>
        <img src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} /> <br/>
        wind {weatherInfo.wind} m/s

      </div>
    )
  }

  export default WeatherInfo