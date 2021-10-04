import React from 'react';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
import ItemView from '../components/ItemView';
import Profile from '../components/Profile';
import {Button, Icon} from 'react-native-elements';
import VerifyEmail from '../components/VerifyEmail';
import Shop from '../components/Shop';
import SubCategories from '../components/SubCategories';
import ItemsCard from '../components/ItemsCard';
import Items from '../components/Items';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

function MyTabs({navigation}) {
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
        component={Shop}
        options={{
          headerLeft: () => (
            <Button
              type="clear"
              onPress={() => {
                navigation.openDrawer('Root');
              }}
              icon={
                <Icon name="navicon" type="evilicon" color="#fff" size={35} />
              }
            />
          ),
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
        component={Root}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SubCategories" component={SubCategories} />
      <Stack.Screen name="Items" component={Items} />
      <Stack.Screen name="ItemView" component={ItemView} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Screens;
