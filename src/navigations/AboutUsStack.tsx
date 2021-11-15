import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AboutUs from '../components/AboutUs';

const Stack = createStackNavigator();

export default function AboutUsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="aboutUs"
        component={AboutUs}
        options={{title: "About Us"}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({

})
