import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import Overview from './admin-components/Overview';
import KYC from './admin-components/KYC';
import Messages from './admin-components/Messages';
import Settings from './admin-components/Settings';
import Help from './admin-components/Help';

export default function Home() {
  const overViewRef = useRef();
  const reportsRef = useRef();
  const messagesRef = useRef();
  const settingsRef = useRef();
  const helpRef = useRef();
  const [currentNavigation, setCurrentNavigation] = useState(overViewRef);
  const [contentRender, setContentRender] = useState(null);

  function selectNavigation(navRef) {
    if (currentNavigation == null) return;
    if (currentNavigation === navRef) return;
    currentNavigation.current.classList.remove('NavigationSelected');
    setCurrentNavigation(navRef);
    updateNavigation(navRef);
  }

  useEffect(() => {
    currentNavigation.current.classList.add('NavigationSelected');
  }, [currentNavigation]);

  function updateNavigation(navRef) {
    let targetContent = navRef.current.innerHTML;
    switch (targetContent) {
      case 'Overview':
        setContentRender(<Overview></Overview>);
        break;
      case 'Verify KYC':
        setContentRender(<KYC></KYC>);
        break;
      case 'Messages':
        setContentRender(<Messages></Messages>);
        break;
      case 'Settings':
        setContentRender(<Settings></Settings>);
        break;
      case 'Help':
        setContentRender(<Help></Help>);
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <NavigationContainer>
        <h1>Pasabay</h1>
        <Navigation ref={overViewRef} onClick={() => selectNavigation(overViewRef)}>Overview</Navigation>
        <Navigation ref={reportsRef} onClick={() => selectNavigation(reportsRef)}>Verify KYC</Navigation>
        <Navigation ref={messagesRef} onClick={() => selectNavigation(messagesRef)}>Messages</Navigation>
        <Navigation ref={settingsRef} onClick={() => selectNavigation(settingsRef)}>Settings</Navigation>
        <Navigation ref={helpRef} onClick={() => selectNavigation(helpRef)}>Help</Navigation>
      </NavigationContainer>
      <ContentContainer>
        {contentRender}
      </ContentContainer>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
`;

const NavigationContainer = styled.div`
  height: 100vh;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
`;
const ContentContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

const Logo = styled.img`
  width: 70%;
`;

const Navigation = styled.button`
  width: 90%;
  border-radius: 20px;
  border: none;
  padding: 1em 0em;
  background-color: transparent;
  font-size: 1.25em;
  text-align: start;
  padding-left: 1em;
`;