import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';

const Weather =  ({weatherData}) => {
        const {country, city, temperature, minimum, maximum, humidity, description, icon, error} = weatherData;
        return(
            <Row className='weather__info'>
                <Col className='weather-p'>
                {temperature && 
                          <h1 className='weather-t'>{(temperature / 10).toFixed(2)} ℃</h1>}
                </Col>  
                <Col className='weather-p'>
                {description && icon && 
                <h2><img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="img"/>
               <span className='weather-t'>{description}</span></h2> }
                </Col>   
                <Col className='weather-p'>
                {minimum && maximum && humidity && <p>
                      <span>{(minimum / 10).toFixed(2)} ℃</span>
                      <span>{(maximum / 10).toFixed(2)} ℃</span>
                      <span>H {humidity}%</span>
                </p>}
                </Col>    
                <Col className='weather-p'>
                {country && city && 
                          <p className='weather-p'>{city}, {country}</p>}
                </Col> 
                <Col className='weather-error'>
                {error && <span>{error}</span>}
                </Col>  
        </Row>
        )
}

export default Weather;
