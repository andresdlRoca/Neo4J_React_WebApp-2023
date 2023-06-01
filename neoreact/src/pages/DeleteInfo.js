import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function DeleteInfo() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState("");

  const handledeleteuser = (event) => {
    // const form = event.currentTarget;
    if (validated !== false) {
      event.preventDefault();
      event.stopPropagation();

      let body = {};
      fetch(`http://localhost:4000/deletePerson/${user}`, {
        method: "DELETE",
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
    }
    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated}>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Delete user</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            onChange={(event) => {
              setUser(event.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <br />

        <Button onClick={handledeleteuser}>DeleteInfo</Button>
        <br />
      </Form>
    </>
  );
}

export default DeleteInfo;
