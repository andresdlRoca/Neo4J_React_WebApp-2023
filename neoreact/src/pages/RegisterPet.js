import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function RegisterPet() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Pet's Name</Form.Label>
        <Form.Control required type="text" placeholder="Pet's Name" />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>Rescue date</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="date"
            placeholder="email"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a valid date.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>Vaccines</Form.Label>
        <Form.Check label="Parvovirus 1" feedbackType="invalid" />
        <Form.Check label="Parvovirus 2" feedbackType="invalid" />
        <Form.Check label="Parvovirus 3" feedbackType="invalid" />
        <Form.Check label="Tetravalente 1" feedbackType="invalid" />
        <Form.Check label="Tetravalente 2" feedbackType="invalid" />
        <Form.Check label="Rabia" feedbackType="invalid" />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Label>Dog's fertility</Form.Label>
        <Form.Check label="This dog is neutered" feedbackType="invalid" />
      </Form.Group>
      <br />

      <Button type="submit">Register Pet</Button>
      <br />
    </Form>
  );
}

export default RegisterPet;
