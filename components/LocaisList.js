import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LocalCard from './LocalCard';

const LocaisList = ({ locais, navigation }) => {
  return (
    <View style={styles.localContainer}>
      <FlatList
        horizontal
        data={locais.slice(0, 5)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('LocalDetailScreen', { local: item })}
          >
            <LocalCard
              nome={item.nome}
              endereco={item.endereco}
              numeroTelefone={item.numeroTelefone}
              horario={item.horario}
              informacoes={item.informacoes}
              imagens={item.imagens || []}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  localContainer: {
    width: '100%',
    backgroundColor: '#0D8B50',
    height: '31%', 
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default LocaisList;