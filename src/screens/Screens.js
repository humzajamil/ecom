import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../components/Register';

const Stack = createNativeStackNavigator();

const Screens = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Sign Up" component={Register} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Screens;
