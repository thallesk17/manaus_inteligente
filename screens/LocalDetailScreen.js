import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useUser } from './../components/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import InfoModal from './../components/InfoModal';

const LocalDetailScreen = ({ route, navigation }) => {
  const [favoritado, setFavoritado] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useUser();
  const idValue = userId.userId;

  const local = route.params.local;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  useEffect(() => {
    const verificarFavorito = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://192.168.0.192:3000/user/checkFavorite/${idValue}/${local._id}`);
          
          console.log("Frontend response:", response.data);
          console.log(idValue)
          console.log(local._id)
      
          if (response.data && response.data.data) {
            const isFavorite = response.data.data.isFavorite;
            if (isFavorite !== undefined) {
              setFavoritado(isFavorite);
            } else {
              console.error('Erro ao verificar favorito: Propriedade isFavorite está indefinida na resposta do servidor', response.data);
            }
          } else {
            console.error('Erro ao verificar favorito: Resposta do servidor não está no formato esperado', response.data);
          }
        } catch (error) {
          console.error('Erro ao verificar favorito:', error);
        } finally {
          setLoading(false);
        }
      };

    verificarFavorito();
  }, [local._id]);

  const handleFavoritar = async () => {
    try {
      setLoading(true);
      await axios.post(`http://192.168.0.192:3000/user/addFavorite/${idValue}/${local._id}`);
      setFavoritado(!favoritado);
    } catch (error) {
      console.error('Erro ao favoritar o local:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.nomeTela}>Detalhes</Text>
      <TouchableOpacity onPress={openModal}>
        <Icon name="phone" size={30} color="#000080" />
      </TouchableOpacity>

      <InfoModal visible={modalVisible} onClose={closeModal} />      
      {local.imagens && local.imagens.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {local.imagens.map((imagem, index) => (
            <Image key={index} source={{ uri: imagem }} style={styles.imagem} />
          ))}
        </ScrollView>
      )}
      <Text style={styles.campo}>Nome:</Text>
      <Text style={styles.nome}>{local.nome}</Text>
      <Text style={styles.campo}>Endereço:</Text>
      <Text style={styles.nome}>{local.endereco}</Text>
      <Text style={styles.campo}>Telefone:</Text>
      <Text style={styles.nome}>{local.numeroTelefone}</Text>
      <Text style={styles.campo}>Horário:</Text>
      <Text style={styles.nome}>{local.horario}</Text>
      <Text style={styles.campo}>Informações:</Text>
      <Text style={styles.nome}>{local.informacoes}</Text>

      <Button style={{ ...styles.favoritar, fontSize: 34 }}
        title={favoritado ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        onPress={handleFavoritar}
        disabled={loading}
        color="#000080"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D8B50',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
  imagem: {
    width: 200,
    height: 200,
    marginVertical: 30,
    marginRight: 10,
    borderRadius: 8,
  },
  nomeTela: {
    marginTop: 45,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000080',
  },
});

export default LocalDetailScreen;