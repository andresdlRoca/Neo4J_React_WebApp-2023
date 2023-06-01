import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function RegisterRace() {
  const [validated, setValidated] = useState(false);
  const [race_name, setrace_name] = useState("");
  const [avg_lifespan, setavg_lifespan] = useState(0);
  const [energetic, setenergetic] = useState("false");
  const [family_friendly, setfamily_friendly] = useState("false");
  const [hypoallergenic, sethypoallergenic] = useState("false");
  const [sheds, setsheds] = useState("false");
  const [size, setsize] = useState("");

  const handleSubmit = (event) => {
    if (validated === false) {
      event.preventDefault();
      event.stopPropagation();

      let org = JSON.stringify({
        race_name: race_name,
        avg_lifespan: avg_lifespan,
        energetic: energetic,
        family_friendly: family_friendly,
        hypoallergenic: hypoallergenic,
        sheds: sheds,
        size: size,
      });

      console.log(org);
      try {
        fetch("http://localhost:4000/race/add", {
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
            if (data.message === "Race added successfully") {
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
    <Form noValidate validated={validated}>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Race Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Race Name"
          onChange={(event) => {
            setrace_name(event.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom02">
        <Form.Label>Race size</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(event) => {
            setsize(event.target.value);
          }}
        >
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
        <Form.Check
          label="These dogs tend to shed"
          feedbackType="invalid"
          onChange={(event) => {
            setsheds(event.target.checked ? "true" : "false");
          }}
        />
        <Form.Check
          label="These dogs tend to be energetic"
          feedbackType="invalid"
          onChange={(event) => {
            setenergetic(event.target.checked ? "true" : "false");
          }}
        />
        <Form.Check
          label="These dogs are hypoallergenic"
          feedbackType="invalid"
          onChange={(event) => {
            sethypoallergenic(event.target.checked ? "true" : "false");
          }}
        />
        <Form.Check
          label="These dogs are family friendly"
          feedbackType="invalid"
          onChange={(event) => {
            setfamily_friendly(event.target.checked ? "true" : "false");
          }}
        />
      </Form.Group>
      <br />

      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Race Average Life Span</Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Race Average Life Span"
          onChange={(event) => {
            setavg_lifespan(event.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <br />

      <Button type="button" onClick={handleSubmit}>
        Register Race
      </Button>
      <br />
    </Form>
  );
}

export default RegisterRace;
