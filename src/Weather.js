import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';

const Weather =  (props) => {
        return(
            <Row className='weather__info'>
                <Col className='weather-p'>
                {props.country && props.city && <p> Location: 
                          <span className='weather-t'>{props.city}, {props.country}</span></p>}
                </Col>  
                <Col className='weather-p'>
                {props.temperature && <p>Temperature: 
                          <span className='weather-t'>{props.temperature}</span></p>}
                </Col>  
                <Col className='weather-p'>
                {props.humidity && <p>Humidity: 
                          <span className='weather-t'>{props.humidity}</span></p>}
                </Col>  
                <Col className='weather-p'>

                {props.description && 
                <p>Conditions:  <span className='weather-t'>{props.description}</span></p>}
                </Col>  
                <Col className='weather-error'>
                {props.error && <p>{props.error}</p>}
                </Col>  
        </Row>
        )
}


export default Weather;
