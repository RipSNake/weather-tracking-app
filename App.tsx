import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, BackHandler, ScrollView, Text, View, SafeAreaView, Keyboard, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native';
import AboutUs from './src/components/AboutUs';
import FavoriteCities from './src/components/FavoriteCities';
import Home from './src/components/Home';
import Loader from './src/components/Loader';
import SearchView from './src/components/SearchView';
import mockedCities from './src/mockUps/favouriteCities';

export default function App() {
  // go back functionality to exit app if on Main Screen
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const ocultarTeclado=()=>{
    Keyboard.dismiss();
  };
  return (
    <>
    <TouchableWithoutFeedback onPress={()=>ocultarTeclado()}> 
      <View style={styles.container}>
        
        <SearchView/>
        {/* 
        <StatusBar style="auto" />
        <Home/>
        <AboutUs/><FavoriteCities cities={mockedCities}/> */}
      </View>
    </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
