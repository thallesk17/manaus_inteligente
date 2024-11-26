import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { View, Text, StyleSheet, Image } from 'react-native';

const LocalCard = ({ nome, endereco, numeroTelefone, horario, informacoes, imagens }) => (
  <Card style={[styles.card, { margin: 10, width: 200 }]}>
    <Card.Content>
      <Title style={[styles.nome]}>{nome}</Title>
      {imagens && imagens.length > 0 && (
        <Image source={{ uri: imagens[0] }} style={{ width: '100%', height: 120 }} />
      )}
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
    nome: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "#0D8B50",
    },
    card: {
      backgroundColor: '#000080',
    },
    dado: {
      fontSize: 14,
      fontWeight: 'bold',
      color: "#ffffff",
    },
    campo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#0D8B50",
      },
  });

export default LocalCard;
