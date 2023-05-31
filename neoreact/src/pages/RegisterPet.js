import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function RegisterPet() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [neutered, setNeutered] = useState("");
  const [rescue_date, setRescue_Date] = useState("");
  const [Parvovirus1, setParvovirus1] = useState("");
  const [Parvovirus2, setParvovirus2] = useState("");
  const [Parvovirus3, setParvovirus3] = useState("");
  const [Tetravalente1, setTetravalente1] = useState("");
  const [Tetravalente2, setTetravalente2] = useState("");
  const [Rabia, setRabia] = useState("");

  const handleSubmit = (event) => {

  let vaccines = []
    if (Parvovirus1 === "true"){
      vaccines.push("Parvovirus1")
    }
    if (Parvovirus2 === "true"){
      vaccines.push("Parvovirus2")
    }
    if (Parvovirus3 === "true"){
      vaccines.push("Parvovirus3")
    }
    if (Tetravalente1 === "true"){
      vaccines.push("Tetravalente1")
    }
    if (Tetravalente2 === "true"){
      vaccines.push("Tetravalente2")
    }
    if (Rabia === "true"){
      vaccines.push("Rabia")
    }


    if (validated === false) {
      event.preventDefault();
      event.stopPropagation();

      
      let org = JSON.stringify({
        name: name,
        adopted: false,
        age: age,
        neutered:neutered,
        rescue_date:rescue_date,
        vaccines: vaccines
      });

      console.log(org);
      try {
        fetch("http://localhost:4000/dog/add", {
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
        <Form.Label>Pet's Name</Form.Label>
        <Form.Control required type="text" placeholder="Pet's Name" 
          onChange={(event) => {
            setName(event.target.value);
          }}/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Pet's Age</Form.Label>
        <Form.Control required type="number" placeholder="Pet's Age" 
          onChange={(event) => {
            setAge(event.target.value);
          }}/>
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
            onChange={(event) => {
              setRescue_Date(event.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please choose a valid date.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>Vaccines</Form.Label>
        <Form.Check label="Parvovirus 1" feedbackType="invalid" 
        onChange={(event) => {
          setParvovirus1(event.target.checked ? "true" : "false");
        }}/>
        <Form.Check label="Parvovirus 2" feedbackType="invalid" 
        onChange={(event) => {
          setParvovirus2(event.target.checked ? "true" : "false");
        }}/>
        <Form.Check label="Parvovirus 3" feedbackType="invalid" 
        onChange={(event) => {
          setParvovirus3(event.target.checked ? "true" : "false");
        }}/>
        <Form.Check label="Tetravalente 1" feedbackType="invalid" 
        onChange={(event) => {
          setTetravalente1(event.target.checked ? "true" : "false");
        }}/>
        <Form.Check label="Tetravalente 2" feedbackType="invalid" 
        onChange={(event) => {
          setTetravalente2(event.target.checked ? "true" : "false");
        }}/>
        <Form.Check label="Rabia" feedbackType="invalid" 
        onChange={(event) => {
          setRabia(event.target.checked ? "true" : "false");
        }}/>
      </Form.Group>
      <br />

      <Form.Group>
        <Form.Label>Dog's fertility</Form.Label>
        <Form.Check label="This dog is neutered" feedbackType="invalid" 
          onChange={(event) => {
            setNeutered(event.target.checked ? "true" : "false");
          }}/>
      </Form.Group>
      <br />

      <Button type="submit">Register Pet</Button>
      <br />
    </Form>
  );
}



export default RegisterPet;
