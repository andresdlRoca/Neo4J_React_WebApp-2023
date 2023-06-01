import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function UpdateInfo() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [type_user, setTypeUser] = useState("");
  const [age, setAge] = useState("");
  const [allergic, setAllergic] = useState("false");
  const [has_family, setHasFmily] = useState("false");
  const [has_pets, setHasPets] = useState("false");
  const [sedentary, setSedentary] = useState("false");

  const handleSubmit = (event) => {
    if (allergic ===""){
      setAllergic("false");
    }

    if (has_family ===""){
      setHasFmily("false");
    }

    if (has_pets ===""){
      setHasPets("false");
    }

    if (sedentary ===""){
      setSedentary("false");
    }

    if (validated === false) {
      event.preventDefault();
      event.stopPropagation();

      

      let org = JSON.stringify({
        name: name,
        email: email,
        type_user: type_user,
        age: age,
        allergic: allergic,
        has_family: has_family,
        has_pets: has_pets,
        sedentary: sedentary,
      });

      console.log(org);
      try {
        fetch("http://localhost:4000/person/update_user", {
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
            if (data.message === "Person added successfully") {
              console.log("exito");
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
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom02">
        <Form.Label>User Type</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(event) => {
            setTypeUser(event.target.value);
          }}
        >
          <option>Select user type</option>
          <option value="User">User</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Vet">Vet</option>
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
            onChange={(event) => {
              setAge(event.target.value);
            }}
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
          onChange={(event) => {
            setSedentary(event.target.checked ? "true" : "false");
          }}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Check
          label="Are you allergic to dogs?"
          feedbackType="invalid"
          onChange={(event) => {
            setAllergic(event.target.checked ? "true" : "false");
          }}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Check
          label="Do you have family?"
          feedbackType="invalid"
          onChange={(event) => {
            setHasFmily(event.target.checked ? "true" : "false");
          }}
        />
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Check
          label="Do you already have pets?"
          feedbackType="invalid"
          onChange={(event) => {
            setHasPets(event.target.checked ? "true" : "false");
          }}
        />
      </Form.Group>
      <br />

      <Button type="button" onClick={handleSubmit}>
        Register
      </Button>
      <br />
    </Form>
  );
}

export default UpdateInfo;
