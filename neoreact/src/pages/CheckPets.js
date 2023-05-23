import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

function CheckPets() {
  const [validated, setValidated] = useState(false);
  const [found, setFound] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    !found ? setFound(true) : setFound(false); 
  };

  const handleAdopt = (event) => {
    console.log("perrito adoptado!")
    handleClose()
  };

  const handleHide = (event) => {
    setFound(false)
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          
          <Form.Group md="4" controlId="validationCustomUsername">
            <Form.Label>Enter the pets username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="pets username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please type the pets username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <br/>
        <Button type="submit">Search this pet!</Button>
      </Form>

      <br/>
      <br/>

      {found ? (
            <Card style={{ width: '25rem' }}>
              <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
              <Card.Body>
                <Card.Title>Pet name</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Stack direction="horizontal" gap={3}>
                  <Button variant="primary" onClick={handleShow}>Adopt it!</Button>
                  <Button variant="outline-secondary" onClick={handleHide}>Cancel</Button>
                </Stack>
              </Card.Body>
            </Card>
          ) : <Alert
          variant="danger"
          onClose={() => setFound(false)}
          dismissible
        >
          La mascota no se encontro, quizas ya fue adoptada o no escribio bien el pet username
        </Alert>}

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Adoptar a este perro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Estas seguro que quieres adoptar a este perro? 
              Si es asi, ingresa tu username para adoptar al perro
            </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please type your username.
              </Form.Control.Feedback>
            </InputGroup>

          </Modal.Body>
          
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAdopt}>
              Adopt this dog
            </Button>
          </Modal.Footer>
        </Modal>

    </>
  );
}

export default CheckPets;