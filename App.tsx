import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigations/Navigations';
import storage from './src/storage/storage';
import { store } from './store/store';


export default function App() {
  const [localStorage, setLocalStorage] = useState(storage)
  console.log("new Rendere")
  // go back functionality to exit app if on Main Screen
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
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
      <Provider store={store}>
        <Navigation storage={localStorage}/>
      </Provider>
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
