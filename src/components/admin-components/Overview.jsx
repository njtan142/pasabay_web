import React from 'react'
import styled from 'styled-components'

export default function Overview() {
  return (
    <Container>
      <Header>
        <Title><h1>Overview</h1> <p>Improve your company's social profile</p></Title>
        <Profile>
          <Frame></Frame>
          <Name>Juan Dela Cruz</Name>
        </Profile>
      </Header>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  padding-left: 1em;

  h1{
    margin-bottom: 0.1em;
  }
  p{
    margin-top: 0.1em;
  }
`;

const Profile = styled.div`
  display: flex;
  width: 200px;
  height: 3em;
  background-color: white;
  margin-right: 2em;
  border-radius: 10px;
  align-items: center;
  padding: 0px 10px;
  gap: 5px;
`;

const Frame = styled.div`
  width: 30px;
  height: 30px;
  background-color: gray;
  border-radius: 50%;
`;

const Name = styled.h3``;

