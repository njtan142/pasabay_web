import styled from "styled-components";
import { UseAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";


const Users = (props) => {
    const [userList, setUserList] = useState();
    const [renderedUsers, setRenderedUsers] = useState();

    const { getUsers } = UseAuth();
    
    function renderList(){
        const rows = []
        if(userList){
            userList.map((user)=>{
                console.log(user)
                rows.push(
                    <div>{user.Username}({user.Age} yrs old)</div>
                )
            })
        }
        setRenderedUsers(rows);
    }

    useEffect(() => {
        console.log(getUsers())
        let usersArr = [];
        getUsers().then(users => {
            users.forEach((doc) => {
                usersArr.push(doc.data())
            })
        }).then(()=>{
        console.log(usersArr)
        setUserList(usersArr)
        })
    }, []);

    useEffect(()=>{
        renderList();
    },[userList])

    return (
        <Container>
            <Title>List of Users</Title>

            <UserList>
                {renderedUsers}
                {console.log(renderedUsers)}
            </UserList>

        </Container>

    )
}

const Container = styled.div`
   
`;

const Title = styled.h1`
    text-align: center;
`;

const UserList = styled.div`
    border-radius: 11px;
    width: 50%;
    margin: 0 auto;
    margin-top: 5em;
    padding: 1em 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    div{
        padding: 7px 1em;
        border: 1px solid #2261a8;
        min-width: 180px;
        border-radius: 10px;
    }
`;

const User = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default Users