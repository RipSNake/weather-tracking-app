import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../components/Search'
import CitiesList from '../components/CitiesList';
import storage from '../storage/storage';
import City from '../components/City';

const Stack = createStackNavigator();

export default function SearchCityStack(props: { storage: any; }) {
  console.log("Search City Stack", props.storage);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={Search}
        options={{title: 'Search Cities'}}
      />
      <Stack.Screen
        name="cityDetail"
        component={City}
        options={{title: 'City\'s Details'}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
