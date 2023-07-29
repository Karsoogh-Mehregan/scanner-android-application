import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Footstep from './screens/Footstep';
import QRCodeReader from './components/QRCodeReader';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
  return (
    <>
    <StatusBar style="auto" />
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} options={{
        title: "",
        headerStyle: {
          backgroundColor: "#7B27FF",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }} />
    <Stack.Screen name="Home" component={Home} options={{
        title: "Home",
        headerStyle: {
          backgroundColor: "#85BC22",
        },
        headerTintColor: "#fff",
        headerShown: false,
      }} />
      <Stack.Screen name="Footstep" component={Footstep} options={{
        title: "Location Changer",
        headerStyle: {
          backgroundColor: "#85BC22",
        },
        headerTintColor: "#fff",
        headerShown: false,
      }} />

    </Stack.Navigator>
  </NavigationContainer>  
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
