import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput , TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from './../components/UserContext';

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


const UserScreen = ({ navigation, route }) => {
  const { name: initialName, email } = route.params;
  const { userId } = useUser();
  const idValue = userId.userId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(initialName);

  const handleEditProfile = async () => {
    try {
      const response = await fetch(`http://192.168.0.192:3000/user/edit/${idValue}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedName,
        }),
      });

      const result = await response.json();

      if (result.status === 'SUCCESS') {
        setIsEditing(false);
        setEditedName(editedName);
      } else {
        console.error('Error editing profile:', result.message);
      }
    } catch (error) {
      console.error('Error editing profile:', error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`http://192.168.0.192:3000/user/delete/${idValue}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.status === 'SUCCESS') {
        navigation.navigate("Signup");
      } else {
        console.error('Error deleting profile:', result.message);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer style={styles.container}>
        {/* <WelcomeImage resizeMode="cover" source={require('./../assets/img/expo-bg2.png')} /> */}

        <WelcomeContainer>
        <PageTitle welcome={true}>Perfil</PageTitle>
          <Avatar resizeMode="cover" source={require('./../assets/img/userr.png')} style={styles.avatar} />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={(text) => setEditedName(text)}
            />
          ) : (
            <SubTitle welcome={true} style={styles.subTitle}>{editedName}</SubTitle>
          )}
          <SubTitle welcome={true} style={styles.subTitle}>{email || 'olgasimp@gmail.com'}</SubTitle>

          <StyledFormArea style={styles.buttonContainer}>
            {/* <Avatar resizeMode="cover" source={require('./../assets/img/userr.png')} /> */}

            {/* <Line /> */}
            <StyledButton style={styles.logoutStyle} onPress={() => navigation.navigate("Login")}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
            {isEditing ? (
              <>
                <StyledButton style={styles.logoutStyle} onPress={handleEditProfile}>
                  <ButtonText>Salvar Edições</ButtonText>
                </StyledButton>
                <StyledButton style={styles.logoutStyle} onPress={() => setIsEditing(false)}>
                  <ButtonText>Cancelar Edição</ButtonText>
                </StyledButton>
              </>
            ) : (
              <StyledButton style={styles.logoutStyle} onPress={() => setIsEditing(true)}>
                <ButtonText>Editar Perfil</ButtonText>
              </StyledButton>
            )}
            <StyledButton style={styles.logoutStyle} onPress={handleDeleteProfile}>
                <ButtonText>Excluir Perfil</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
        <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Locais')}>
          <Icon name="home" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ExploreScreen')}>
          <Icon name="search" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FavoriteScreen')}>
          <Icon name="heart" size={30} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
          <Icon name="user" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>
      </InnerContainer>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#0D8B50',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      borderColor: '#000080',
      borderWidth: 2,
      borderRadius: 8,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    localContainer: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
    },
    localList: {
      marginTop: 80,
      marginRight: 82,
      fontSize: 28,
      fontWeight: 'bold',
    },
    nome: {
      fontSize: 58,
      backgroundColor: '#ccc',
      fontWeight: 'bold',
    },
    logoutStyle: {
      marginBottom: 20,
      fontSize: 40,
      fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 80,
      },
    iconContainer: {
      position: 'absolute',
      top: -15,
      right: 10,
      zIndex: 1,
    },
    imagem: {
      width: 200,
      height: 200,
      marginVertical: 10,
      borderRadius: 8,
    },
     footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#000080',
      height: 60,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    icon: {
      color: '#0D8B50',
    },
    subTitle: {
      color: '#000080',
      fontSize: 23, 
    },
  });

export default UserScreen;
