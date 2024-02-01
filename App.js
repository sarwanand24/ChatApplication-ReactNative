/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import React,{useEffect, useState} from 'react';
import { Button, TextInput } from 'react-native-paper';

import {
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './Screens/Login';
import Loading from './Screens/Loading';
import Home from './Screens/Home';
import Chat from './Screens/Chat';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Login" component={Login} />
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
