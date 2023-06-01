import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

function CheckPets() {
  const [validated, setValidated] = useState(false);
  const [dog_data, setOwnerData] = useState([]);
  const [dog_name, setdog_name] = useState("");
  const [user_name, setuser_name] = useState("");

  const [found, setFound] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      const fetchData = async () => {
        try {
          let f = "http://localhost:4000/dog/" + dog_name;
          const response = await fetch(f, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const json = await response.json();
          setOwnerData(json);
        } catch (error) {
          console.log("error: ", error);
        }
      };
      fetchData();
      console.log(dog_data);
    }

    setValidated(true);
    !found ? setFound(true) : setFound(false);
  };

  const handleAdopt = async () => {
    let body = {
      type_relationship: "ADOPTED",
    };
    fetch(`http://localhost:4000/person/${user_name}/dog/${dog_name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleHide = (event) => {
    setFound(false);
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
              onChange={(event) => {
                setdog_name(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please type the pets username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <br />
        <Button type="submit">Search this pet!</Button>
      </Form>

      <br />
      <br />

      {found ? (
        <Card style={{ width: "25rem" }}>
          <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
          <Card.Body>
            <Card.Title>Pet name</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" onClick={handleShow}>
                Adopt it!
              </Button>
              <Button variant="outline-secondary" onClick={handleHide}>
                Cancel
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="danger" onClose={() => setFound(false)} dismissible>
          La mascota no se encontro, quizas ya fue adoptada o no escribio bien
          el pet username
        </Alert>
      )}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Adoptar a este perro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            Estas seguro que quieres adoptar a este perro? Si es asi, ingresa tu
            username para adoptar al perro
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
