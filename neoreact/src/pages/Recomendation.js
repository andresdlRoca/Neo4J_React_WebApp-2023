import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';


function Recomendation() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const data = [
    { id: 23423, name: "dog1" },
    { id: 234232, name: "dog2" },
    { id: 323423, name: "dog3" },
    { id: 234233, name: "dog4" },
    { id: 234233, name: "dog5" },
    { id: 323423, name: "dog6" },
    { id: 234233, name: "dog5" },
    { id: 323423, name: "dog6" },
    { id: 234233, name: "dog5" },
    { id: 323423, name: "dog6" },
  ];

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          
          <Form.Group md="4" controlId="validationCustomUsername">
            <Form.Label>Enter a username to give recomended pets</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <br/>
        <Button type="submit">Recomend me a pet!</Button>
      </Form>

      <br/>
      <br/>

      <Container>
      <Form.Label>Your results: </Form.Label>
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
    </>
  );
}

export default Recomendation;