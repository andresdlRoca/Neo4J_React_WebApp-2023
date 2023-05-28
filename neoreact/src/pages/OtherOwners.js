import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

function OtherOwners() {
  const data = [
    { id: 1123423, name: "owner1" },
    { id: 11234232, name: "owner2" },
    { id: 31123423, name: "owner3" },
    { id: 11234233, name: "owner4" },
    { id: 11234233, name: "owner5" },
    { id: 31123423, name: "owner6" },
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

export default OtherOwners;