import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
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
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/signinbg.png')}
      >
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
        </View>
      </Image>
      {/* <View style={styles.loginContainer}>
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
      </View> */}
    </View>
  )
}
{/* <Image
        style={styles.image}
        source={require('../../assets/vgen.png')}
      /> */}
{/* <TextInput
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
        </TouchableOpacity> */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",



  },
  loginContainer: {
    alignItems: "center",
    flex: .2,
    width: "100%",
    height: "25%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '-15%'

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
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%"
  },
  buttonText: {
    color: "white",
    fontSize: 22,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight
  }

})