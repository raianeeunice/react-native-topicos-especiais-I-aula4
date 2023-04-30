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

export default function Login({ navigation }) {
  const [registeredState, setRegisteredState] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [haveAccount, setHaveAccount] = React.useState("");

  // Salva dados de registro do usuário com SecureStore
  async function getUserData() {
    let userData = await SecureStore.getItemAsync("userData");

    if (userData) {
      setEmail(JSON.parse(userData).email);
      setRegisteredState({ ...JSON.parse(userData) });
      setHaveAccount(true);
    } else {
      setHaveAccount(false);
    }
  }

  async function handleDelete() {
    // usada para remover a chave userData (dados gravados)
    await SecureStore.deleteItemAsync("userData");
  }

  React.useEffect(() => {
    getUserData();

    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  function handleLogin() {
    if (email.length !== 0 && password.length !== 0) {
      if (
        email === registeredState.email &&
        password === registeredState.password
      ) {
        setPassword("");
        navigation.replace("Home", { name: registeredState.name });
      } else {
        Alert.alert(
          "Erro ao tentar efetuar o login",
          "Informe o e-mail e a senha corretamente."
        );
      }
    } else {
      Alert.alert(
        "Erro ao tentar efetuar o login",
        "Informe o e-mail e a senha corretamente."
      );
    }
  }

  function handleRegister() {
    setEmail("");
    setPassword("");
    navigation.navigate("Register");
  }

  function handleDeleteRegister() {
    SecureStore.deleteItemAsync("userData");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Secure Store App</Text>

      <TextInput
        style={styles.input}
        defaultValue={email}
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder={"E-mail"}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder={"Senha"}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Separator marginVertical={10} />

      {!haveAccount ? (
        <>
          <Text style={styles.textSimple}>
            É a primeira vez aqui e ainda não se cadastrou?
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastra-se</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.textSimple}>Já possuo uma conta, porém...</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert(
                "Informação:",
                `A sua senha foi enviada para o e-mail cadastrado: ${registeredState.email}`
              )
            }
          >
            <Text style={styles.buttonText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </>
      )}

      <Separator marginVertical={30} />

      <Text style={styles.textSimpleJustify}>
        Este aplicativo faz uso de armazenamento local com SecureStore e fará
        também com AsyncStorage
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteRegister}
      >
        <Text style={styles.deleteButtonText}>Deletar chave</Text>
      </TouchableOpacity>
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
  button: {
    width: "50%",
    height: 40,
    backgroundColor: "#DB7093",
    padding: 5,
    borderRadius: 5,
  },
  loginButton: {
    width: "50%",
    height: 40,
    backgroundColor: "#4169E1",
    padding: 5,
    borderRadius: 5,
  },
  loginButtonText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  buttonText: {
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
    margin: 10,
    width: "90%",
  },
  textSimpleJustify: {
    fontSize: 10,
    color: "#730000",
    width: "90%",
    textAlign: "justify",
    marginTop: 35,
    marginBottom: 5,
  },
  deleteButton: {
    width: "50%",
    height: 40,
    backgroundColor: "#CD5C5C",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
