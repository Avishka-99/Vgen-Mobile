import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Delivery() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
  })
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}