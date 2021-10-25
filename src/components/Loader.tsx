import React from 'react'
import { View, Text, StyleSheet, StyleProp } from 'react-native'

export default function Loader() {
  return (
    <View>
      <Text style={styles.spinner}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {
    rotation: 40
  }
})