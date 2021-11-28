import React from 'react';
import { StyleSheet } from 'react-native'
import FavouriteCities from '../components/FavouriteCities'
import { createStackNavigator } from '@react-navigation/stack';
import AddCity from '../components/AddCity';
import City from '../components/City';

const Stack = createStackNavigator();

export default function FavouriteCitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favouriteCities"
        component={FavouriteCities}
        options={{title: "Favourite Cities"}}
      />
      <Stack.Screen
        name="addCity"
        component={AddCity}
        options={{title: "Add City"}}
      />
      <Stack.Screen
        name="cityDetail"
        component={City}
        options={{title: "City"}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
