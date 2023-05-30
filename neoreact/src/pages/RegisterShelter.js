import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { countries } from "../countries";

function RegisterShelter() {
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
        <Form.Label>Shelter's Name</Form.Label>
        <Form.Control required type="text" placeholder="Shelter's Name" />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom02">
        <Form.Label>Shelter's location</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Select a country</option>
          {countries.map((c) => (
            <option value={c.label}>{c.label}</option>
          ))}
        </Form.Select>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Shelter's Volunteers amount</Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Shelter's Volunteers amout"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Shelter's Foundation date</Form.Label>
        <Form.Control
          required
          type="date"
          placeholder="Shelter's Foundation date"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Button type="submit">Register Shelter</Button>
      <br />
    </Form>
  );
}

export default RegisterShelter;
