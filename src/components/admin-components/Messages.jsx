import React from 'react';
import styled from 'styled-components';
import Inbox from './messages-components/Inbox';

export default function Messages() {
  return (
    <Container>
      <Convos>
        <Title>Chats</Title>
        <Search>
          <Input></Input>
          <Button>Search</Button>
        </Search>
      </Convos>
      <Inbox></Inbox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Convos = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #f0f0f0;
  box-sizing: border-box;
`;

const Title = styled.h1`
  padding-left: 10px;
  font-weight: 500;
`;

const Search = styled.div`
  display: flex;
  padding: 0px 10px;
`;


const Input = styled.input`
  flex-grow: 1;
  border: none;
  height: 2em;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const Button = styled.button`
  border: none;
  background-color: #4993d8;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;