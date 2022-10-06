import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase';
import { useRef } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';


export default function KYC() {
  const [users, setUsers] = useState();
  const KYCPhotoRef = useRef();
  const [selectedUser, setSelectedUser] = useState();
  const [KYCLoaded, setKYCLoaded] = useState(false);

  useEffect(() => {
    const usersRef = collection(firestore, 'users');
    const usersDoc = getDocs(usersRef);
    usersDoc.then((docs) => {
      setUsers(docs.docs)
    })
  }, [])

  return (
    <Container>
      <UserList>
        <h1>Users</h1>
        {
          users && users.map((user, index) => {
            const userData = user.data()
            const verified = userData['KYCVerified'] == true ? "Verified" : userData['KYCVerified'] == false? "Denied" : "Unverified"
            return (
              <User key={index} onClick={() => {
                setKYCLoaded(false);
                KYCPhotoRef.current.src = "";
                const photoRef = ref(storage, "KYC/" + user.id);
                  getDownloadURL(photoRef).then((url) => {
                    KYCPhotoRef.current.src = url;
                    setKYCLoaded(true)
                    setSelectedUser(user)
                  })
              }}>
                {userData['first_name'] + " (" + verified + ")"}
              </User>
            )
          })
        }
      </UserList>
      <Actions>
        <div>
          <h2>KYC Verification</h2>
          <KYCPhoto ref={KYCPhotoRef}></KYCPhoto>
        </div>
        { 
          KYCLoaded &&
          <Verification>
            <Verify onClick={()=>{
              const userRef = doc(collection(firestore, 'users'), selectedUser.id)
              updateDoc(userRef, {KYCVerified: true}).then(()=>{window.location.reload()})
            }}>Accept</Verify>

            <Deny onClick={()=>{
              const userRef = doc(collection(firestore, 'users'), selectedUser.id)
              updateDoc(userRef, {KYCVerified: false}).then(()=>{window.location.reload()})
            }}>Deny</Deny>
          </Verification>
        }
      </Actions>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100vh;
  justify-items: stretch;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #e9e9e9;
  padding: 0px 20px;
  box-sizing: border-box;
  justify-items: stretch;
  gap: 10px;
`;

const User = styled.div`
  padding: 10px 10px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 3px;
`;

const Actions = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &>div>h2{
    text-align: center;
  }
`;

const KYCPhoto = styled.img`
  display: block;
  height: 50vh;
  margin: 0 auto;
`;
const Verification = styled.div`
  background-color: white;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 0.5em 0px;

  &>button{
    padding: 1.5em 2em;
    border-radius: 10px;
    border: 1px solid gray;
  }
  &>button:hover{
    background-color: #e7e7e7;
  }
  &>button:active{
    background-color: #c0c0c0;
  }
`;

const Verify = styled.button`

`;
const Deny = styled.button`

`;