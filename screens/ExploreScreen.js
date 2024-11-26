import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import InfoModal from './../components/InfoModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocaisList from './../components/LocaisList';

const ExploreScreen = ({ navigation }) => {
  const [locais, setLocais] = React.useState([]);
  const [eventos, setEventos] = React.useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [termoBusca, setTermoBusca] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // const buscarLocais = async () => {
  //   try {
  //     let url = 'http://192.168.0.192:3000/local/buscar';

  //     // Adiciona o termo de busca à URL como um parâmetro
  //     url += `?termo=${encodeURIComponent(termoBusca.trim())}`;

  //     const response = await axios.get(url);
  //     setLocais(response.data.data);
  //   } catch (error) {
  //     console.error('Erro ao buscar locais:', error);
  //   }
  // };

  
  const buscarLocais = async () => {
    try {
      let url = 'http://192.168.0.192:3000/local/buscar';
  
      url += `?termo=${encodeURIComponent(termoBusca.trim())}`;
  
      const response = await axios.get(url);
      const { locais, eventos } = response.data.data;
  
      setLocais(locais);
      setEventos(eventos);
    } catch (error) {
      console.error('Erro ao buscar locais e eventos:', error);
    }
  };

  React.useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await axios.get('http://192.168.0.192:3000/local/getall');
        setLocais(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar locais:', error);
      }
    };
    

    fetchLocais();
  }, []);

  React.useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://192.168.0.192:3000/event/getall');
        setEventos(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar Eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  const teatro = "./../assets/img/locais/teatro1.jpg"




  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.nomeTela}>Explorar</Text>
        <TouchableOpacity onPress={openModal}>
          <Icon name="phone" size={30} color="#000080" />
        </TouchableOpacity>

        <InfoModal visible={modalVisible} onClose={closeModal} />
        <TextInput
          style={styles.input}
          placeholder="Buscar por nome ou categoria..."
          value={termoBusca}
          onChangeText={(text) => setTermoBusca(text)}
        />
        <Button title="Buscar" onPress={buscarLocais} color="#000080" />
        <Text style={styles.localList}>Todos os locais         </Text>       
        <LocaisList locais={locais} navigation={navigation} />
        <Text style={styles.localList}>Todos os Eventos     </Text>       
        <LocaisList locais={eventos} navigation={navigation} />
        {/* {locais.map((local) => (
          <TouchableOpacity
            key={local._id}
            onPress={() => navigation.navigate('LocalDetailScreen', { local })}
          >
            <View style={styles.localContainer}>
              <Text style={styles.nome}>{local.nome}</Text>
              <Text>{local.endereco}</Text>
              <Text>{local.numeroTelefone}</Text>
              <Text>{local.horario}</Text>
              <Text>{local.informacoes}</Text>
            </View>
          </TouchableOpacity>
        ))} */}
      </ScrollView>

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  localContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  localList: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000080',
    marginRight: 102,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nomeTela: {
    marginTop: 45,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000080',
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderColor: '#000080',
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 8,
    width: 200,
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
});

export default ExploreScreen;