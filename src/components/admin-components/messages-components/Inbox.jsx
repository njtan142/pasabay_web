import React from 'react'
import styled from 'styled-components'

export default function Inbox() {
  return (
    <Container>
        <Header>
            <Profile>
                <Picture></Picture>
                <Name>Juan Dela Cruz</Name>
            </Profile>
            <Actions>
                <Action></Action>
                <Action></Action>
                <Action></Action>
                <Action></Action>
            </Actions>
        </Header>
        <Content></Content>
        <MessageInput>
            <Input></Input>
            <Send>➤</Send>
        </MessageInput>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background-color: #cbe0f11a;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    height: 5em;
    width: 100%;
    background-color: #ffffffce;
    align-items: center;
    justify-content: space-between;
    padding: 0px 1em;
    box-sizing: border-box;
`;

const Profile = styled.div`
    display: flex;
    gap: 1em;
    align-items: center;
`;

const Picture = styled.div`
    background-color: #bbbbbb;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-sizing: border-box;
`;

const Name = styled.h2`
    
`;

const Actions = styled.div`
    
`;

const Action = styled.button`
    width: 30px;
    height: 30px;
`;

const Content = styled.div`
    flex-grow: 1;
`;

const MessageInput = styled.div`
    height: 5em;
    width: 100%;
    background-color: #ffffffce;
    box-sizing: border-box;
    padding: 1.25em 3em;
    display: flex;
    align-items: stretch;
    
`;

const Input = styled.input`
    flex-grow: 1;
    border: none;
    background-color: #e3e5e7;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-sizing: border-box;
    padding: 0px 1em;
    

    &:focus{
        outline: #8fc9ff solid 1px;
        margin: 1px;
    }
`;

const Send = styled.button`
    width: 5em;
    border: none;
    background-color: #4993d8;
    color: white;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;