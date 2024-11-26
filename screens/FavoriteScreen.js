import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useUser } from './../components/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../components/styles';

const FavoriteScreen = ({ navigation }) => {
  const { userId } = useUser();
  const idValue = userId.userId;
  const [Favorite, setFavorite] = useState([]);

  useEffect(() => {
    const carregarFavorite = async () => {
      try {
        const response = await axios.get(`http://192.168.0.192:3000/user/getFavorites/${idValue}`);
        setFavorite(response.data.data);
      } catch (error) {
        console.error('Erro ao carregar Favorite:', error);
      }
    };

    carregarFavorite();
  }, [idValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.nomeTela}>Favoritos</Text>
      {Favorite.length === 0 ? (
        <Text>Nenhum item favorito encontrado.</Text>
      ) : (
        <FlatList
          data={Favorite}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Line />
              <Text style={styles.campo}>Nome:</Text>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.campo}>Endereço:</Text>
              <Text style={styles.nome}>{item.endereco}</Text>
              <Text style={styles.campo}>Telefone:</Text>
              <Text style={styles.nome}>{item.numeroTelefone}</Text>
              <Text style={styles.campo}>Horário:</Text>
              <Text style={styles.nome}>{item.horario}</Text>
            </View>
          )}
        />
      )}
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
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D8B50',
    flex: 1,
    padding: 7,
  },
  nomeTela: {
    marginTop: 45,
    marginBottom: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000080',
    textAlign: 'center',
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 8,
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
  nome: {
    marginBottom: 8,
    fontSize: 18,
    color:"#fff",
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  campo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000080',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
});

export default FavoriteScreen;
