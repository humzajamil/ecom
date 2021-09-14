import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
import ItemView from '../components/ItemView';
import Profile from '../components/Profile';
import {Button, Icon} from 'react-native-elements';
import VerifyEmail from '../components/VerifyEmail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: 'red',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'red',
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'red'},
        headerTintColor: 'white',
        tabBarLabelStyle: {paddingBottom: 5},
      }}>
      <Tab.Screen
        name="Shop"
        component={Home}
        options={{
          // headerRight: () => (
          //   <Icon
          //     onPress={() => {}}
          //     title="Info"
          //     color="#fff"
          //   />
          // ),
          tabBarLabel: 'Shop',
          tabBarOptions: {activeTintColor: 'white'},
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-bag" type="Entypo" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarOptions: {activeTintColor: 'white'},
          tabBarIcon: ({color, size}) => (
            <Icon name="person" type="Ionicons" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Screens = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Signin"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: 'red'},
        headerTintColor: 'white',
      }}>
      <Stack.Screen name="Signin" component={Login} />
      <Stack.Screen name="Signup" component={Register} />
      <Stack.Screen name="Verify Email" component={VerifyEmail} />
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ItemView" component={ItemView} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Screens;
