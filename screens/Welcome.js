import React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
  Colors,
} from './../components/styles';

const Welcome = ({ navigation, route }) => {
  const { name, email } = route.params;
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/expo-bg2.png')} />

        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
          <SubTitle welcome={true}>{name || 'Olga Simpson'}</SubTitle>
          <SubTitle welcome={true}>{email || 'olgasimp@gmail.com'}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../assets/img/expo-bg1.png')} />

            <Line />
            <StyledButton onPress={() => navigation.navigate("Login")}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
