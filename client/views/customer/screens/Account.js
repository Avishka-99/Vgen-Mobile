import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from '../../../actions/UserAction';
export default function Account() {
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
  })
  return (
    <View style={styles.container}>
      <Button title='Log out' onPress={() => {
        dispatch(setUserAction(''))
      }}></Button>
    </View>
  )
}