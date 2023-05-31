import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from 'react';
import LikeButton from '../components/LikeButton';
import UnlikeButton from '../components/UnlikeButton';

function AvailablePets() {

  const user_name = 'User3';
  const [pet_data, setPetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/available_dogs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const json = await response.json();
        setPetData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
        <h2 style={{fontFamily: 'Arial'}}>Mascotas disponibles</h2>
        <Row md={3} className="g-3">
          {pet_data.map((dog) => (
            <CardGroup>
              <Card>
                <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
                <Card.Body>
                    <Card.Title>My name is {dog.name}!</Card.Title>
                    <Card.Text>I'm {typeof dog.age === 'object' ? dog.age.low : dog.age} years old</Card.Text>
                    <LikeButton user_name={user_name} dog_name={dog.name}></LikeButton>
                    <UnlikeButton user_name={user_name} dog_name={dog.name}></UnlikeButton>
                </Card.Body>
              </Card>
            </CardGroup>
          ))}
        </Row>
      </Container>
  );

}

export default AvailablePets;