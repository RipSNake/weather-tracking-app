import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'

export default function SearchView() {
  const [searchList, setSearchList] = useState();

  useEffect(() => {
    // fetch cities from the open weather api
    return () => {
    // async fn
    }
  }, [searchList])

  
  return (
      <View>
          <Text style={styles.searchLabel}>Write the city's name</Text>
          <TextInput
              style={styles.searchInput}
          />
          <ScrollView>
            <Text></Text>
          </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
    searchLabel: {
        fontWeight: "600",
    },
    searchInput: {
        backgroundColor: "#565656",
        paddingHorizontal: 5,
    }
});