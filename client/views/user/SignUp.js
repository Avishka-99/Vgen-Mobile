import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform, Touchable } from 'react-native'
import Axios from 'axios';
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { TextInput, RadioButton } from 'react-native-paper'
import Constants from 'expo-constants';

export default function SignUp({navigation}) {
  const [checked, setChecked] = useState('first');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
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
            label={"Name"}
            style={styles.textInput}
            selectionColor="red"
            underlineColor='blue'
          />
          <TextInput
            mode='outlined'
            label={"Email"}
            style={styles.textInput}
          />
          <TextInput
            mode='outlined'
            label={"Password"}
            style={styles.textInput}
          />
          <TextInput
            mode='outlined'
            label={"Confirm password"}
            style={styles.textInput}
          />
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
              
            />
            <Text style={{marginRight:"4%"}}>Customer</Text>
            <RadioButton
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
            />
            <Text style={{marginRight:"4%"}}>Delivery</Text>
          </View>


          <TouchableOpacity style={styles.submitButton} activeOpacity={.9} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.bottomText}>Already a member? <Text style={styles.signUptext} onPress={()=>navigation.navigate('SignIn')}>Sign in</Text></Text>
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
  logo: {
    flex: 1,
    resizeMode: "cover",
    position: 'absolute',
    width: "90%",
    height: "30%",
    marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
    left: "5%",
    top: "3%",

  },
  loginContainer: {
    position: "absolute",
    top: "40%",
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",

  },
  textInput: {
    width: "80%",
    height:40,
    marginBottom:"1%"

  },
  radioButtonContainer:{
    alignItems:"center",
    flexDirection:"row",
  },
  submitButton: {
    position: "relative",
    backgroundColor: "dodgerblue",
    color: "white",
    borderRadius: 50,
    width: "80%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
  },
  bottomText: {
    position: "relative",

  },
  signUptext: {
    color: "royalblue",
    textDecorationLine: "underline",
  }


})