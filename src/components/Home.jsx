import React from 'react';
import styled from 'styled-components';

export default function Home() {
  return (
    <Container>
        <Navigation href='/users'>See Users Lists</Navigation>
        <Navigation href='/destination'>Go To Destination</Navigation>
        <Navigation href='/destinations'>Destinations</Navigation>
    </Container>
  )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    width: 100vw;
    height: 100vh;
`;

const Navigation = styled.a`
    width: 200px;
    padding: 10px 30px;
    font-size: 1.25em;
    background-color: #1d70dd;
    color: white;
    text-decoration: none;
    text-align: center;
    border-radius: 10px;
`;