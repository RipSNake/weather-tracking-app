import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../components/Search'

const Stack = createStackNavigator();

export default function SearchCityStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{title: 'Search Cities'}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
