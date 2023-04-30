import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#00FF7F" }}>
      <StatusBar style="auto" backgroundColor="#4682B4" />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: "#6495ED" },
            headerTintColor: "#FFFFFF",
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
              headerTitleSyle: { fontWeight: "bold", textAlign: "center" },
            }}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Cadastre-se",
              headerTitleSyle: { fontWeight: "bold", textAlign: "center" },
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: "Home",
              headerRight: () => (
                <Button
                  onPress={() => {
                    Alert.alert(
                      "Atenção!",
                      "Deseja sair do aplicativo?",
                      [
                        {
                          text: "Sim",
                          onPress: () => navigation.replace("Login"),
                        },
                        {
                          text: "Não",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  title="Sair"
                  style={{ margin: 15 }}
                  color="#663399"
                />
              ),
              headerTitleSyle: { fontWeight: "bold", textAlign: "center" },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
