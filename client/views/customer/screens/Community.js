import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
export default function Community() {
  var user = useSelector(state => state.counterReducer.counter);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
  })
  return (
    <View style={styles.container}>
    {user=='eventorganizer'?<Text>Event</Text>:<Text>None</Text>}
      <Text>Community</Text>
    </View>
  )
}