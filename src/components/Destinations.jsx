import React from 'react';
import styled from 'styled-components';
import { collection, query, where, getDocs, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { firestore } from '../firebase';
import { useState, useEffect, useRef } from 'react';

export default function Destinations() {

    const [destinations, setDestinations] = useState([]);
    const [destinationsToRender, setDestinationsToRender] = useState();
    const [selectedCategory, setSelectedCategory] = useState("cultural");
    const [editing, setEditing] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState();

    const selectionRef = useRef();


    const category = useRef();
    const name = useRef();
    const location = useRef();
    const description = useRef();
    const latitude = useRef();
    const longitude = useRef();


    const postLocation = async (e) => {
        e.preventDefault();

        const locationsRef = collection(firestore, 'LocationsData');
        let docRef;

        switch (category.current.value) {
            case 'cultural':
                docRef = doc(locationsRef, 'cultural');
                break;
            case 'manmade':
                docRef = doc(locationsRef, 'manmade');
                break;
            case 'specialevents':
                docRef = doc(locationsRef, 'festival');
                break;
            case 'specialinterest':
                docRef = doc(locationsRef, 'specialinterest');
                break;
            default:
                break;
        }

        if (docRef === undefined) {
            return;
        }
        const categoryRef = collection(docRef, 'destinations')
        const destinationRef = doc(categoryRef,)
        console.log(docRef);


        const attractions = {
            name: name.current.value,
            location: location.current.value,
            description: description.current.value,
            latitude: latitude.current.value,
            longitude: longitude.current.value
        }

        const result = await setDoc(destinationRef, attractions).then(() => {
            window.location.reload();
        });



        console.log(attractions, result);
    }



    useEffect(() => {
        async function getDoc(category) {
            const destinationquery = query(collection(doc(collection(firestore, 'LocationsData'), category), 'destinations'))
            const querySnapshot = await getDocs(destinationquery);
            let cl = [];
            querySnapshot.forEach((doc) => {
                cl.push(doc);
            });
            console.log(cl);
            setDestinations(cl);
        }
        getDoc(selectedCategory)
    }, [selectedCategory])

    useEffect(() => {
        if (!destinations) return;

        function editLocation(data) {
            setEditing(true)
            setSelectedDestination(data)
            const destination = data.data();
            category.current.value = selectedCategory
            name.current.value = destination.name
            location.current.value = destination.location
            description.current.value = destination.description
            latitude.current.value = destination.latitude
            longitude.current.value = destination.longitude
        }
        const toRender = [];
        destinations.forEach((doc) => {
            const destination = doc.data();
            toRender.push(<Location onClick={() => { editLocation(doc) }}>{destination.name}</Location>)
        })
        setDestinationsToRender(toRender);
    }, [destinations, selectedCategory])

    function selectionChange() {
        setSelectedCategory(selectionRef.current.value)
    }



    function updateLocation(e) {
        e.preventDefault();
        console.log('location updated')

        const destinationRef = doc(collection(doc(collection(firestore, 'LocationsData'), category.current.value), 'destinations'), selectedDestination.id)

        getDoc(destinationRef).then((destination) => {
            console.log(destination.data())
        })

        setDoc(destinationRef, {
            name: name.current.value,
            location: location.current.value,
            description: description.current.value,
            latitude: latitude.current.value,
            longitude: longitude.current.value
        }).then(() => {
            window.location.reload();
        })

        name.current.value = ""
        location.current.value = ""
        description.current.value = ""
        latitude.current.value = ""
        longitude.current.value = ""

    }
    function deleteLocation() {
        const destinationRef = doc(collection(doc(collection(firestore, 'LocationsData'), category.current.value), 'destinations'), selectedDestination.id)

        deleteDoc(destinationRef).then(() => {
            window.location.reload();
        })
    }

    return (

        <Container>
            <Explore >
                <select ref={selectionRef} name="" id="" onChange={() => { selectionChange() }}>
                    <option value="cultural">Cultural</option>
                    <option value="manmade">Man-made</option>
                    <option value="specialevents">Festival / Special Events</option>
                    <option value="specialinterest">Special Interest</option>

                </select>
                <div>
                    {
                        destinationsToRender ? destinationsToRender : null
                    }
                    {console.log(destinationsToRender)}
                </div>

            </Explore>
            <Add>
                <FormGroup onSubmit={!editing ? postLocation : updateLocation}>
                    <Input>
                        <Label>Category</Label>
                        <select name="category" id="category" ref={category}>
                            <option value="cultural">Cultural</option>
                            <option value="manmade">Man-made</option>
                            <option value="specialevents">Festival / Special Events</option>
                            <option value="specialinterest">Special Interests</option>

                        </select>
                    </Input>

                    <Input>
                        <Label>Name</Label>
                        <input type="text" ref={name} required />
                    </Input>
                    <Input>
                        <Label>Location</Label>
                        <input type="text" ref={location} required />
                    </Input>
                    <Input>
                        <Label>Description</Label>
                        <textarea name="description" id="description" cols="30" rows="10" ref={description} required></textarea>
                    </Input>
                    <Input>
                        <Label>Location</Label>
                        <input type="text" placeholder='latitude' ref={latitude} required />
                        <input type="text" placeholder='longitude' ref={longitude} required />
                    </Input>
                    {
                        !editing ? <Submit type="submit" value="Submit"></Submit> : <Submit type="submit" value="Update"></Submit>
                    }
                </FormGroup>
                {
                    editing && <button onClick={deleteLocation}>Delete</button>
                }
            </Add>
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
    
    &>select{
        display: block;
        width: 50%;
        margin: 0 auto;
        margin-top: 1em;
        padding: 0.5em 0em;
        text-align: center;
        border-radius: 20px;
    }
    
    &>div{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-content: flex-start;
        justify-content: space-evenly;
        padding-top: 1em;
        overflow-y: scroll;
    }
`;
const Add = styled.div`
    width: 50vw;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &>button{
        width: 50%;
        margin-top: 1em;
        padding: 0.5em 0em;
    }
`;

const Location = styled.div`
    width: 25%;
    height: 100px;
    border: 1px solid blue;
    border-radius: 10px;
    padding: 5px 10px;
    overflow-y: scroll;
`;


const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  font-size: 1.2em;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.h3`
  margin-bottom: 0px;
  font-weight: 600;
`;

const Submit = styled.input`
  font-size: 1.25em;
  padding: 10px 30px;
  background-color: #ddb502;
  margin-top: 1em;
  border: none;
  border-radius: 5px;
`;
