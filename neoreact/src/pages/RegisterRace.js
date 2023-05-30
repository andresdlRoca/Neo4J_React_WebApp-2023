import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function RegisterRace() {
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
        <Form.Label>Race Name</Form.Label>
        <Form.Control required type="text" placeholder="Race Name" />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom02">
        <Form.Label>Race size</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Select the size</option>
          <option value="Little">Little</option>
          <option value="Medium">Medium</option>
          <option value="Big">Big</option>
        </Form.Select>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>About this race</Form.Label>
        <Form.Check label="This dogs tend to shed" feedbackType="invalid" />
        <Form.Check
          label="This dogs tend to be energetic"
          feedbackType="invalid"
        />
        <Form.Check
          label="This dogs are hypoallergenic"
          feedbackType="invalid"
        />
        <Form.Check
          label="This dogs are family friendly"
          feedbackType="invalid"
        />
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Race Average Life Span</Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Race Average Life Span"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Button type="submit">Register Race</Button>
      <br />
    </Form>
  );
}

export default RegisterRace;
