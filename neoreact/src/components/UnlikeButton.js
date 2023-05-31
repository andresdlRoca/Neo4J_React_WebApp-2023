import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';

function UnlikeButton({user_name, dog_name}) {

    const deleteLike = async () => {
    fetch(`http://localhost:4000/deleteLikes/${user_name}/${dog_name}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    }


    return (
        <>
            <Button onClick={deleteLike} variant="danger">Unlike</Button>{' '}
        </>
    );
}

export default UnlikeButton;