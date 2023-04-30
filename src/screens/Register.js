import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import Separator from "../components/Separator";

export default function Register({ navigation }) {
  const [state, setState] = React.useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    userPassword: "",
  });

  const [userPasswordConfirm, setUserPasswordConfirm] = React.useState("");

  // Salva dados de registro do usuário com SecureStore
  const saveUserData = (userData) => {
    return SecureStore.setItemAsync("userData", JSON.stringify(userData));
  };

  function handleRegister() {
    if (
      !state.userName ||
      !state.userPhone ||
      !state.userEmail ||
      !state.userPassword ||
      !userPasswordConfirm
    ) {
      Alert.alert(
        "Erro ao tentar cadastrar usuário",
        "Preencha todos os campos corretamente!"
      );
    } else {
      if (state.userPassword !== userPasswordConfirm) {
        Alert.alert(
          "Erro ao tentar cadastrar usuário",
          "Senha não confere com a confirmação da senha!"
        );
      } else {
        saveUserData({
          name: state.userName,
          phone: state.userPhone,
          email: state.userEmail,
          password: state.userPassword,
        });
        navigation.navigate("Login", { email: state.userEmail });
      }
    }
  }

  const handleChangeText = (key, value) => {
    setState({ ...state, [key]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dados do Usuário</Text>

      <TextInput
        style={styles.input}
        value={state.userName}
        onChangeText={(value) => handleChangeText("userName", value)}
        placeholder={"Nome"}
      />

      <TextInput
        style={styles.input}
        value={state.userPhone}
        onChangeText={(value) => handleChangeText("userPhone", value)}
        placeholder={"Telefone"}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={state.userEmail}
        onChangeText={(value) => handleChangeText("userEmail", value)}
        placeholder={"E-mail"}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={state.userPassword}
        onChangeText={(value) => handleChangeText("userPassword", value)}
        placeholder={"Senha"}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        value={userPasswordConfirm}
        onChangeText={(value) => setUserPasswordConfirm(value)}
        placeholder={"Confirmar Senha"}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleRegister}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      <Separator marginVertical={30} />

      <Text style={styles.textSimple}>Atenção!</Text>
      <Text style={styles.textSimple}>
        Informe um e-mail válido, pois em caso de recuperação de senha, ela será
        enviada para o e-mail cadastrado.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ADD8E6",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#4169E1",
    marginBottom: 20,
    textAlign: "center",
  },
  saveButton: {
    width: "50%",
    height: 40,
    backgroundColor: "#6495ED",
    padding: 5,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 45,
    padding: 10,
    borderRadius: 5,
    borderColor: "#6495ED",
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "#F0F8FF",
  },
  textSimple: {
    color: "#4169E1",
    width: "95%",
    textAlign: "justify",
  },
});
