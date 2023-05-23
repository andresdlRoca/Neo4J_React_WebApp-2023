import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

function AvailablePets() {
  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 3, name: "Jane Doe" },
    { id: 3, name: "Jane Doe" },
    { id: 3, name: "Jane Doe" },
  ];

  return (
    <Container>
        <Row md={3} className="g-3">
          {data.map((user) => (
            <CardGroup>
              <Card>
                <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
                <Card.Body>
                  <Card.Title>{user.id}</Card.Title>
                  <Card.Text>{user.name}</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          ))}
        </Row>
      </Container>
  );

}

export default AvailablePets;