import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { countries } from "../countries";

function RegisterShelter() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [foundation_date, setFoundation] = useState("");
  const [volunteers, setVolunteers] = useState("");

  const handleSubmit = (event) => {
    if (validated === false) {
      event.preventDefault();
      event.stopPropagation();

      let org = JSON.stringify({
        name: name,
        location: location,
        foundation_date: foundation_date,
        volunteers: volunteers,
      });

      console.log(org);
      try {
        fetch("http://localhost:4000/shelter/add", {
          method: "POST",
          mode: "cors",
          body: org,
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Shelter added successfully") {
              console.log("exito al agregar shelter");
            } else {
              console.log("fallo");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Shelter's Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Shelter's Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom02">
        <Form.Label>Shelter's location</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        >
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
          onChange={(event) => {
            setVolunteers(event.target.value);
          }}
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
          onChange={(event) => {
            setFoundation(event.target.value);
          }}
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
