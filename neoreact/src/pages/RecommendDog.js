import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from 'react';


function RecommendDog() {
    const user_name = 'Grace Clark';
    const [recommendation_by_race, setRecommendationByRace] = useState([]);
    const [recommendation_by_age, setRecommendationByAge] = useState([]);
    const [recommendation_by_size, setRecommendationBySize] = useState([]);
    const [recommendation_by_location, setRecommendationByLocation] = useState([]);

    //Recommendations
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response_race = await fetch(`http://localhost:4000/recommend_dogs_race/${user_name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                  });
                const response_age = await fetch(`http://localhost:4000/recommend_dogs_age/${user_name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                });
                const response_size = await fetch(`http://localhost:4000/recommend_dogs_size/${user_name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const response_location = await fetch(`http://localhost:4000/recommend_dogs_location/${user_name}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const json_race = await response_race.json();
                const json_age = await response_age.json();
                const json_size = await response_size.json();
                const json_location = await response_location.json();
                setRecommendationByRace(json_race);
                setRecommendationByAge(json_age);
                setRecommendationBySize(json_size);
                setRecommendationByLocation(json_location);

            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, [user_name]);
    
    return (
        <Container>
            <h2 style={{fontFamily: 'Arial'}}>Recomendacion por raza</h2>
            <Row md={3} className="g-3">
            {recommendation_by_race.map((dog) => (
                <CardGroup>
                <Card>
                    <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
                    <Card.Body>
                    <Card.Title>My name is {dog.name}!</Card.Title>
                    <Card.Text>I'm {typeof dog.age === 'object' ? dog.age.low : dog.age} years old</Card.Text>
                    </Card.Body>
                </Card>
                </CardGroup>
            ))}
            </Row>
            <hr></hr>
            <br></br>
            <h2 style={{fontFamily: 'Arial'}}>Recomendacion por edad</h2>
            <Row md={3} className="g-3">
            {recommendation_by_age.map((dog) => (
                <CardGroup>
                <Card>
                    <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
                    <Card.Body>
                    <Card.Title>My name is {dog.name}!</Card.Title>
                    <Card.Text>I'm {typeof dog.age === 'object' ? dog.age.low : dog.age} years old</Card.Text>
                    </Card.Body>
                </Card>
                </CardGroup>
            ))}
            </Row>
            <hr></hr>
            <br></br>

            <h2 style={{fontFamily: 'Arial'}}>Recomendacion por tamaño</h2>
            <Row md={3} className="g-3">
            {recommendation_by_size.map((dog) => (
                <CardGroup>
                <Card>
                    <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
                    <Card.Body>
                    <Card.Title>My name is {dog.name}!</Card.Title>
                    <Card.Text>I'm {typeof dog.age === 'object' ? dog.age.low : dog.age} years old</Card.Text>
                    </Card.Body>
                </Card>
                </CardGroup>
            ))}
            </Row>
            <hr></hr>
            <br></br>

            <h2 style={{fontFamily: 'Arial'}}>Recomendacion por localizacion</h2>
            <Row md={3} className="g-3">
            {recommendation_by_location.map((dog) => (
                <CardGroup>
                <Card>
                    <Card.Img variant="top" src="/nino-feliz-con-su-perro.jpeg" />
                    <Card.Body>
                    <Card.Title>My name is {dog.name}!</Card.Title>
                    <Card.Text>I'm {typeof dog.age === 'object' ? dog.age.low : dog.age} years old</Card.Text>
                    </Card.Body>
                </Card>
                </CardGroup>
            ))}
            </Row>
        </Container>
    );
    

}

export default RecommendDog;