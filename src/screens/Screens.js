import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';

const Stack = createNativeStackNavigator();

const Screens = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Signin" component={Login} />
      <Stack.Screen name="Signup" component={Register} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Screens;
