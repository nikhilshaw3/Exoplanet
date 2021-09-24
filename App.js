import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import Details from './screens/Details'

export default function App() {
  return <AppContainer/>
}

const AppStackNavigator = createStackNavigator(
{
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Details: {
    screen: Details
  }
},
{
  initialRouteName : "Home"
}
)

const AppContainer = createAppContainer(AppStackNavigator)