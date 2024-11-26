import React from 'react';
import { Modal, Text, View, Button } from 'react-native';

const InfoModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
        <Text>
            Acidentes de Trânsito - 194 {'\n'}
            Aeroporto Internacional Eduardo Gomes - 3652-1212 {'\n'}
            Águas do Amazonas - 0800-920195 {'\n'}
            Busca e Salvamento - 3654-3030 {'\n'}
            Corpo de Bombeiros - 193 {'\n'}
            Defesa Civil - 199 {'\n'}
            Disk - Denúncia 147 {'\n'}
            Disk - Detran 3642-3355 {'\n'}
            Disk-Gás - 0800 90 9292 (Fogás), 3617-2000 (Amazongás) {'\n'}
            IBAMA - 3613-3277 {'\n'}
            IML - 3216-6070 {'\n'}
            Infraero - 3621-1212 {'\n'}
            Justiça Volante - 0800-644-2020 {'\n'}
            Juizado de Menores - 3657-1384 {'\n'}
            Manaus Energia - 0800 701 3001 {'\n'}
            Polícia Civil - 147 {'\n'}
            Polícia Federal - 3655-1517 {'\n'}
            Polícia Militar - 190 {'\n'}
            Porto de Manaus - 3621-4301 {'\n'}
            Prefeitura - 0800 280 8280 {'\n'}
            Procon - 0800 92 1512 {'\n'}
            Rodoviária - 3642-5808 {'\n'}
            SEDEMA - Meio Ambiente 3648-0764 {'\n'}
            S.O.S. Criança - 0800 92 1407 {'\n'}
            Samu - 192
        </Text>
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
