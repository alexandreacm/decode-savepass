import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from './styles';

export function HeaderForm() {
  const { goBack } = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={styles.button}
      >
        <MaterialIcons
          name="chevron-left"
          size={32}
          color="#1967FB"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Cadastro
      </Text>
    </View>
  );
}