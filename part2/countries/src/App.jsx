import { useState, useEffect } from 'react'

import CountryListItem from './components/CountryListItem'
import Notification from './components/Notification'
import CountryInfo from './components/CountryInfo'
import WeatherInfo from './components/WeatherInfo'
import countriesService from './services/countries'
import weatherService from './services/weather'


function App() {
  const [keyword, setKeyword] = useState('')
  const [allCountries, setAllCountries] = useState(null)
  const [notification, setNotification] = useState(null)
  const [selectedCountries, setSelectedCountries] = useState([])
  const [weatherInfo, setWeatherInfo] = useState(null)

  const countriesHook = () => {
    countriesService
      .getAll()
      .then(countries => {
        setAllCountries(countries)
      })
  }
  useEffect(countriesHook, [])

  let countryInfo = null

  const weatherHook = () => {
    if (selectedCountries.length == 1) {

      countryInfo = selectedCountries[0]
      console.log("weather hook", countryInfo.name.official)

      weatherService
        .get(countryInfo.capitalInfo.latlng)
        .then(response => {
          console.log(response)
          const info = {
            place: countryInfo.capital,
            temperature: response.main.temp,
            icon: response.weather[0].icon,
            wind: response.wind.speed
          }
          console.log("weather info ", countryInfo.capital)
          setWeatherInfo(info)

        })

    }
    else {
      setWeatherInfo(null)
    }


  }
  useEffect(weatherHook, [selectedCountries])




  const handleKeywordChange = (event) => {
    console.log(event.target.value)
    setKeyword(event.target.value)
    setNotification(null)
    setSelectedCountries([])

    if (allCountries) {

      let searchList = allCountries.filter(country => country.name.official.toLowerCase().includes(event.target.value.toLowerCase()))

      console.log("search filter")
      console.log(keyword)
      console.log(allCountries.length)
      console.log(searchList.length)

      if (searchList.length > 10) {
        console.log("too many countries")
        setNotification("Too many matches, specify another filter")
      }
      else if (searchList.length > 1) {

        console.log("countries list")
        searchList.forEach(element => {
          console.log(element.name.official)
        });

        setSelectedCountries(searchList)



      }
      else if (searchList.length == 1) {
        console.log("country")
        setSelectedCountries(searchList)


      }


    }

  }



  let countriesToShow = []



  const showCountryInfo = (country) => {

    console.log("show button", country.name.official)
    setNotification(null)
    setSelectedCountries([country])

  }



  if (selectedCountries.length > 1) {
    console.log("if set list > 1")
    countriesToShow = selectedCountries
    countryInfo = null
  }
  else if (selectedCountries.length == 1) {
    console.log("if set list = 1")
    countriesToShow = []
    countryInfo = selectedCountries[0]
  }
  else {
    countriesToShow = []
    countryInfo = null
  }



  return (
    <div>
      find countries <input value={keyword} onChange={handleKeywordChange} />
      <Notification message={notification} />

      {countriesToShow.map(country =>
        <CountryListItem key={country.name.official} name={country.name.official} showHandler={() => showCountryInfo(country)} />
      )
      }

      <CountryInfo countryInfo={countryInfo} />
      <WeatherInfo weatherInfo={weatherInfo} />
    </div>
  )
}

export default App
