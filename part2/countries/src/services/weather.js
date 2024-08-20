import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'



const get = ([lat,lon]) => {
    const apiKey= import.meta.env.VITE_API_KEY
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    return request.then(response => response.data)
  }


export default { get }