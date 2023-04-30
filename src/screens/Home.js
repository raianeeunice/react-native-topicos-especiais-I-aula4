import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Home {route.params?.email}</Text>

      <Text style={styles.text}>Olá, {route.params?.name}! Seja bem-vindo(a,e)!</Text>
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
  title: {
    fontSize: 20,
    color: '#4682B4',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6495ED',
    textAlign: 'center',
    width: '90%'
  }
});
