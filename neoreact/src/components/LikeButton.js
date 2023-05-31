import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';

function LikeButton({user_name, dog_name}) {

    const body = {
        type_relationship: 'LIKES'  
    };

    const postLike = async () => {
    fetch(`http://localhost:4000/person/${user_name}/dog/${dog_name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
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
            <Button onClick={postLike} variant="primary">Like</Button>{' '}
        </>
    );
}

export default LikeButton;