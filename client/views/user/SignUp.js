import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform, Touchable } from 'react-native'
import Axios from 'axios';
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { RadioButton } from 'react-native-paper'
import Constants from 'expo-constants';
import TextInputField from '../../components/TextInputField';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function SignUp({ navigation }) {
  const [checked, setChecked] = useState('first');
  const [email, setEmail] = useState('');
  return (
      <View style={styles.loginContainer}>
        <TextInputField isSecured={false} iconType={Feather} iconProps={{ "name": "user", "size": 24 }} height="8%" placeholder="First name" function={setEmail} />
        <TextInputField isSecured={false} iconType={Feather} iconProps={{ "name": "user", "size": 24 }} height="8%" placeholder="Last name" function={setEmail} />
        <TextInputField isSecured={false} iconType={FontAwesome} iconProps={{ "name": "id-badge", "size": 24 }} height="8%" placeholder="NIC" function={setEmail} />
        <TextInputField isSecured={false} iconType={Feather} iconProps={{ "name": "phone", "size": 24 }} height="8%" placeholder="Contact no" function={setEmail} />
        <TextInputField isSecured={false} iconType={Feather} iconProps={{ "name": "user", "size": 24 }} height="8%" placeholder="Email" function={setEmail} />
        <TextInputField isSecured={false} iconType={Feather} iconProps={{ "name": "user", "size": 24 }} height="8%" placeholder="Email" function={setEmail} />

        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text style={{ marginRight: "4%", fontFamily: "Poppins-medium", }}>Customer</Text>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
          <Text style={{ marginRight: "4%", fontFamily: "Poppins-medium", }}>Delivery</Text>
        </View>


        <TouchableOpacity style={styles.submitButton} activeOpacity={.9} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>Already a member? <Text style={styles.signUptext} onPress={() => navigation.navigate('SignIn')}>Sign in</Text></Text>
      </View>
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
    height: 40,
    marginBottom: "1%"

  },
  radioButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
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
    fontFamily: "Poppins-medium",
  },
  bottomText: {
    position: "relative",
    fontFamily: "Poppins-medium",

  },
  signUptext: {
    color: "royalblue",
    textDecorationLine: "underline",
    fontFamily: "Poppins-medium",
  }


})