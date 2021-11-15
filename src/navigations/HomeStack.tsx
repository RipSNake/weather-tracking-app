import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home'

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{title: "Home"}}
      />
    </Stack.Navigator>    
    
  )
}

const styles = StyleSheet.create({
  homeComponent: {
    color: 'orange',
    backgroundColor: 'lightgreen'
  }
})
