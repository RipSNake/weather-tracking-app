import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home(props) {

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.headerTitle}>WETApp</Text>
            
            <Text style={styles.paragraph}>Our main goal is to help you get the exact actual Climate Information of your favourite places, 
              to help you decide when and where is the best place to put your energy into.
            </Text>
            <Text style={styles.paragraph}>
                With WETApp you can Search for your desired cities and save them into your personal list, 
                so you don't ever miss another climate change, and keep your efforts updated.
            </Text>
            <Text style={styles.paragraph}>Now let's go  
              <Text 
                style={styles.link}
                onPress={() => props.navigation.navigate('search')}
              > find your first city !</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 28,
        marginVertical: 15,
        textAlign: 'center',
        fontWeight: '600'
    },
    petPic: {
        position: 'absolute',
        right: 20,
        bottom: 40,
    },
    homeContainer: {
      color: "orange",
      paddingHorizontal: 15, 
      paddingVertical: 5,
      alignContent: 'center',
      flex: 1,
      marginVertical: "auto"
    },
    link: {
      textDecorationLine: "underline",
      color: 'lightBlue'
    },
    paragraph: {
      marginVertical: 5,
      fontSize: 15
    }
})