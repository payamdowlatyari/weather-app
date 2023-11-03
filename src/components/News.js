import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';

const News = ({newsData}) => {

    return (
        <div>
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
          </div>
    );
}

export default News;