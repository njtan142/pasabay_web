import React from 'react';
import styled from 'styled-components';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { firestore } from '../firebase';
import { useState, useEffect } from 'react';

export default function Destinations() {

    const [destinations, setDestinations] = useState([])
    

    useEffect(() => {
        async function getDoc(category){
            const destinationquery = query(collection(doc(collection(firestore, 'LocationsData'), category), 'destinations'))
            const querySnapshot = await getDocs(destinationquery);
            let cl = destinations;
            querySnapshot.forEach((doc) => {
              cl.push(doc.data());
            });
            console.log(cl);
            setDestinations(cl);
        }
        getDoc('cultural')
    }, [])
    

    return (

        <Container>
            <Explore>
                {
                    destinations? destinations.map((location)=>{
                        return (<Location>{location.location}</Location>)
                    }): null
                }
            </Explore>
            <Add></Add>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    height: 100vh;
    align-items: stretch;
`;

const Explore = styled.div`
    width: 50vw;
    border: 1px solid black;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-content: flex-start;
    justify-content: space-evenly;
    padding-top: 1em;
`;
const Add = styled.div`
    width: 50vw;
    border: 1px solid black;
`;

const Location = styled.div`
    width: 25%;
    height: 100px;
    border: 1px solid blue;
    border-radius: 10px;
    padding: 5px 10px;

`;