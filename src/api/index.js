const weather_url = 'http://api.openweathermap.org/data/2.5';
const Weather_Api_Key = process.env.REACT_APP_WEATHER_API_KEY;

const news_url = 'https://newsapi.org/v2';
const News_API_Key = process.env.REACT_APP_NEWS_API_KEY;


export const getWeatherByLocation = (location) => fetch(`${weather_url}/weather?q=${location.city},${location.country}&appid=${Weather_Api_Key}`);
export const getNewsUpdates = () => fetch(`${news_url}/top-headlines?country=us&apiKey=${News_API_Key}`)

