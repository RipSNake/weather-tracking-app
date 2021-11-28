import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

export default function Home() {

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.headerTitle}>Weather Tracking</Text>
            <Image 
              source={{uri: "https://reactnative.dev/docs/assets/p_cat1.png"}}
              style={styles.petPic}
            />
            <Text>Hi I am Neru, and I am here to help find, select and save your favorite cities's 
                weather forecasts so you don't miss any important climate change</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        backgroundColor: "#ad9963"
    },
    petPic: {
        position: 'absolute',
        right: 20,
        bottom: 40,
    },
    homeContainer: {
      color: "orange",
      //backgroundColor: "green",
      paddingHorizontal: 15, 
      paddingVertical: 5
    }
})