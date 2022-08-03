import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Toast, { ToastShowParams } from "react-native-toast-message";
import uuid from "react-native-uuid";
import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { styles } from "./styles";
import { CardProps } from '../../components/Card';

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { HeaderForm } from "../../components/HeaderForm";
import { savepass } from "../../constants/storage";

export function Form() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { getItem, setItem } = useAsyncStorage(savepass);

  async function handleNew() {
    try {
      const id: string | number[] = uuid.v4();
      const optionsMsg: ToastShowParams = {
        type: "success",
        text1: "Data storage successfully!",
      };

      const newData:CardProps = {
        id,
        name,
        user,
        password
      };

      const response = await getItem();
      const prevData = response ? JSON.parse(response) : [];

      //const sendData: CardProps[] = [...prevData, newData];
      const sendData: Array<CardProps> = [...prevData, newData];
      await setItem(JSON.stringify(sendData));

      Toast.show(optionsMsg);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Data do not save!",
      });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>
          <HeaderForm />

          <View style={styles.form}>
            <Input
              label="Nome do serviço"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="E-mail ou usuário"
              autoCapitalize="none"
              value={user}
              onChangeText={setUser}
            />
            <Input
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.footer}>
            <Button title="Salvar" onPress={handleNew} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
