import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from 'react';

function OtherOwners() {

  const [owner_data, setOwnerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/other_users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const json = await response.json();
        setOwnerData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <Container>
        <Row md={3} className="g-3">
          {owner_data.map((user) => (
            <CardGroup>
              <Card>
                <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
                <Card.Body>
                  <Card.Title>Hello i'm {user.name}</Card.Title>
                  <Card.Text>My email is {user.email} and I {user.has_pets ? "already have pets." : "don't have pets yet."}</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          ))}
        </Row>
      </Container>
  );
}

export default OtherOwners;