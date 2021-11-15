import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Alert, BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigations/Navigations';

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
  
  return (
    
      
 
        <Navigation/>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
