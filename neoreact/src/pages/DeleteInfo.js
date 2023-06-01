import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function DeleteInfo() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (validated !== false) {
      event.preventDefault();
      event.stopPropagation();

      let org = JSON.stringify({
        nombre: "hola",
        email: email,
      });
      fetch("http://localhost:3000/", {
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
          if (data.msg === "El producto fue registrado con exito") {
            console.log("exito");
          } else {
            console.log("fallo");
          }
        });
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" placeholder="Name" />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom02">
        <Form.Label>User Type</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Select user type</option>
          <option value="1">User</option>
          <option value="2">Volunteer</option>
          <option value="3">Vet</option>
        </Form.Select>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>email</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="email"
            aria-describedby="inputGroupPrepend"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a email.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>Age</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="number"
            placeholder="age"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Enter a valid age.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Check
          label="Do you consider yourself a sedentary person?"
          feedbackType="invalid"
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Check label="Are you allergic to dogs?" feedbackType="invalid" />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Check label="Do you have family?" feedbackType="invalid" />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Check label="Do you already have pets?" feedbackType="invalid" />
      </Form.Group>
      <br />

      <Button type="submit">DeleteInfo</Button>
      <br />
    </Form>
  );
}

export default DeleteInfo;
