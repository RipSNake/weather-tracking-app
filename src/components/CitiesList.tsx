import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { CITIES } from '../services/weatherServiceUtils'

export default function CitiesList(props: { storage: any, navigation: { navigate: (arg0: string) => void } }) {
  console.log("Cities LIST STORAGE ", storage);

  return (
    <View>
      <Text>Open Weather Cities Data List..</Text>
      <FlatList 
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => (index.toString())}
        data={CITIES}
        renderItem={({item}):JSX.Element => {return(
          <View key={item.name} style={styles.cityRow}>
            <Text
              onPress={(item) => props.navigation.navigate("cityDetail")}
            >{item.name}</Text>
            <Text>{item.temperature}</Text>
            <Icon type="material-community" name="star-outline"/>
          </View>)}}
      />
      
      
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    backgroundColor: "#ad9963"
  },
  addBtn: {
    backgroundColor: 'gold',
    borderRadius: 50,
    margin: 10,
    padding: 15,
    position: "absolute",
    bottom: 0, 
    right: 10,
    zIndex: 10000
  },
  filter: {
    backgroundColor: "#565656",
    paddingHorizontal: 5,
  },
  cityRow: {
    borderColor: 'blue',
    borderWidth: 2,
    marginVertical: 5,
    padding: 10
  }
})
