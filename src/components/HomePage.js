import React from 'react';
import { useState , useEffect} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Weather from './Weather';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Titles from './Titles';
import Form from './Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import * as api from '../api/index.js';

const HomePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
  })

  const [newsData, setNewsData] = useState({
    news: []
  })


  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

   const getWeather = async (e) => {
          e.preventDefault();

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const location = {city, country};

        const api_call = await api.getWeatherByLocation(location); 
        const response = await api_call.json();
    
        console.log(response);

        if (response.cod === 404 || response.cod === 401) {
            console.log(response.message);
            setWeatherData({
              ...weatherData,
              error: response.message,
            });

        } else   
      
        if(city && country){
          setWeatherData({
            ...weatherData,
          temperature: response.main.temp,
          city: response.name,
          country: response.sys.country,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          error: ""
        })
  }

    else {
      setWeatherData({
        ...weatherData,
        error: "Please enter the values..."
      })
    } 
  }

 const getNews = async (e) =>  {

  e.preventDefault();
  setLoading(true);

    try {

      const api_call = await api.getNewsUpdates();
      const response = await api_call.json();

      console.log(response);

      setNewsData({
        ...newsData, 
        news: response.articles
      })
    } catch (error) {
      console.error(error);
    }
}

  return ( 
      <Tabs
      defaultActiveKey="weather"
      transition={false}
      id="noanim-tab-example"
      style={{marginBottom: '1em'}}
      >
        <Tab 
        eventKey="weather" 
        title="Weather"
        >
          <Container>
        <Row>
        <Titles />
        <Row md={12}>
        <Col md={7}>
        <Form loadWeather={getWeather} />
     </Col>
     <Col md={5}>
     <Weather 
        temperature={weatherData.temperature}
        city={weatherData.city}
        country={weatherData.country}
        humidity={weatherData.humidity}
        description={weatherData.description}
        error={weatherData.error}/>
      </Col>
     </Row>
     </Row>
     </Container>
        </Tab>
        <Tab eventKey="news" title="News">
        <Container>
         <Row className="mb-3">
            <Button
              variant="light"
              disabled={isLoading}
              onClick={!isLoading ? getNews : null}
            >
              {isLoading ? 'Loading…' : 'Click to load the latest news'}
            </Button>
         </Row>
         <Row xs={1} md={2} className="g-4 mb-3">
            {newsData.news.map((item) => (
              <Col key={item} style={{display: 'inline-block', margin: '1em'}}>
              <Card style={{ width: '18rem', margin: '1em' }}>
              <Card.Img variant="top" src={item.urlToImage} style={{ width: '150px'}}/>
              <Card.Body>
              <Card.Link href={item.url}>
                <Card.Title style={{overflow: 'hidden'}}>{item.title.slice(0,30)} ...</Card.Title>
                </Card.Link>
                <Card.Text style={{overflow: 'hidden'}}>
                  {item.description.slice(0,100)} ...
                </Card.Text>
              </Card.Body>   
              <Card.Footer>
                <small className="text-muted">{item.source.name} </small>
            </Card.Footer>
              </Card>
              </Col>
            ))}
         </Row>
        </Container>
        </Tab>
      </Tabs>
    );
}

export default HomePage;