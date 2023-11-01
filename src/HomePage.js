import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Weather from './Weather';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Titles from './Titles';
import Form from './Form';
import Container from 'react-bootstrap/esm/Container';
const Api_Key = 'e84aa460c857811e8ae17eed3a1293e0';

class HomePage extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
          e.preventDefault();

    const city = e.target.elements.city.value;

    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);      
    const response = await api_call.json();
    
    console.log(response);

    
    if(city && country){
    this.setState({
      temperature: response.main.temp,
      city: response.name,
      country: response.sys.country,
      humidity: response.main.humidity,
      description: response.weather[0].description,
      error: ""
    })
  }
  else {
    this.setState({
      error: "Please enter the values..."
    })
  } 
}

  render () {
    return ( 
      <Tabs
      defaultActiveKey="weather"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
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
        <Form loadWeather={this.getWeather} />
     </Col>
     <Col md={5}>
     <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}/>
     </Col>
        </Row>
     
     </Row>
     </Container>
        </Tab>
        <Tab eventKey="news" title="News">
          Tab content for News
        </Tab>
      </Tabs>
    );
  }
}

export default HomePage;