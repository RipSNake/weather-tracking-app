import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'

export default function Search() {
  const [searchList, setSearchList] = useState();

  useEffect(() => {
    // fetch cities from the open weather api
    return () => {
    // async fn
    }
  }, [searchList])

  
  return (
      <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
          <Text style={styles.searchLabel}>Write the city's name</Text>
          <TextInput
              style={styles.searchInput}
          />
          <ScrollView>
            <Text>Search Screen !</Text>
          </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
    searchLabel: {
        fontWeight: "600",
    },
    searchInput: {
        backgroundColor: "#d6d6d6",
        paddingHorizontal: 5,
    }
});