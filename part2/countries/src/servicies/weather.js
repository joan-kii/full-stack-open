import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const getWeather = (city) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  return axios.get(weatherUrl)
}

export default { getWeather }
