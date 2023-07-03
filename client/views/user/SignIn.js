import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform } from 'react-native'
import Axios from 'axios';
import React from 'react'
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper'
import Constants from 'expo-constants';

export default function SignIn() {
  console.log(Constants.deviceName)
  const handleSubmit = () => {
    Axios.get("http://192.168.1.219:5000/api/get").then((response) => {
      console.log(response.data);
    });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.avoidingView}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/signinbg.png')}
          blurRadius={1}
        />
        <Image
          style={styles.logo}
          source={require('../../assets/vgen_white.png')}
        />
        <View style={styles.loginContainer}>
          <TextInput
            mode='outlined'
            label={"User name"}
            style={styles.textInput}
            selectionColor="red"
            underlineColor='blue'
          />
          <TextInput
            mode='outlined'
            label={"Password"}
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.submitButton} activeOpacity={.9} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <Text>Not a member? Sign up</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  avoidingView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "space-between",



  },
  image: {
    flex: 1,
    resizeMode: "cover",
    position: 'absolute',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
  },
  logo:{
    flex: 1,
    resizeMode: "cover",
    position: 'absolute',
    width: "90%",
    height: "30%",
    marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
    left:"5%",
    top:"12%",

  },
  loginContainer: {
    position: "absolute",
    top: "50%",
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",

  },
  textInput: {
    width: "80%",
    marginBottom: "2%"
  },
  submitButton: {
    backgroundColor: "dodgerblue",
    color: "white",
    borderRadius: 50,
    width: "80%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%"
  },
  buttonText: {
    color: "white",
    fontSize: 22,
  },


})