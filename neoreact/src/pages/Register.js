import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (validated === false) {
      event.preventDefault();
      event.stopPropagation();

      let org = JSON.stringify({
        nombre: nombre,
        passw: passw,
        correo: correo,
        correoA: correoA,
        username: username,
        telefono: telefono,
        imagen: imagen,
      });
      fetch("http://localhost:8080/registrar-organizaciones", {
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
            Swal.fire({
              icon: "success",
              title: "Registro completado",
              text: data.msg,
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Hubo un error",
              text: data.msg,
            });
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

      <Button type="submit">Register</Button>
      <br />
    </Form>
  );
}

export default Register;
