import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform, Touchable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from '../../actions/UserAction';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import { LinearGradient } from 'expo-linear-gradient';
export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // let [fontsLoaded] = useFonts({
  //   "Poppins": require('../../assets/fonts/Poppins-Light.ttf')
  // })
  //console.log(email)
  const dispatch = useDispatch();
  const handleSubmit = () => {
    //dispatch(setUserAction('delivery'))
    Axios.post(API_ENDPOINTS.SIGNIN_URL, {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.type == 'Customer') {
        dispatch(setUserAction('customer'))
      } else if (response.data.type == 'Delivery') {
        dispatch(setUserAction('delivery'))
      }
      //console.log(response.data.type)
    })
    /*Axios.get("http://192.168.1.219:5000/api/get").then((response) => {
      console.log(response.data);
    });*/
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.avoidingView}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/vgen.png')}
          contentFit="cover"
        />
        <View style={styles.loginOuter2}>
          <View style={styles.loginOuter}>
            <View style={styles.loginContainer}>
              <Image
                style={styles.image_2}
                source={require('../../assets/vf-bg.png')}

              />
              <View style={styles.textInputRow}>
                <Feather name="user" size={25} color="white" />
                <TextInput
                  style={styles.textInput}
                  placeholder='Email'
                  onChangeText={(event) => setEmail(event)}
                  placeholderTextColor={'white'}
                  selectionColor={'green'}
                />
              </View>
              <View style={styles.textInputRow}>
                <Feather name="lock" size={25} color="white" />
                <TextInput
                  placeholder='Password'
                  style={styles.textInput}
                  onChangeText={(event) => setPassword(event)}
                  secureTextEntry={true}
                  placeholderTextColor={'white'}
                  selectionColor={'green'}
                />
              </View>


              <LinearGradient
                colors={['#7EB693', '#BEDC7C']}
                style={styles.submitButtonContainer}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}>
                <TouchableOpacity style={styles.submitButton} activeOpacity={.9} onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
              </LinearGradient>



              <Text style={styles.bottomText}>Not a member? <Text style={styles.signUptext} onPress={() => navigation.navigate('SignUp')}>Sign up</Text></Text>
            </View>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,


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
  image_2: {
    flex: 1,
    resizeMode: "repeat",
    position: 'absolute',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.2

  },
  logo: {
    flex: 1,
    position: 'absolute',
    width: "90%",
    height: "30%",
    marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
    left: "5%",
    top: "12%",

  },
  loginOuter2: {
    position: "absolute",
    top: "50%",
    width: "100%",
    height: "50%",
    backgroundColor: "#B9DB7E",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  loginOuter: {
    position: "relative",
    top: "4%",
    width: "100%",
    height: "100%",
    backgroundColor: "#7EB694",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  loginContainer: {
    position: "relative",
    top: "4%",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",


  },
  textInputRow: {
    top: "5%",
    width: "80%",
    flexDirection: "row",
    marginBottom: "2%",
    height: "12%",
    backgroundColor: "#7EB694",
    alignItems: "center",
    padding: 3,
    borderRadius: 8
  },
  textInput: {
    width: "80%",
    backgroundColor: "#7EB694",
    color: "white",
    paddingLeft: 10
  },
  submitButtonContainer: {
    position: "relative",
    backgroundColor: "dodgerblue",
    color: "white",
    borderRadius: 50,
    width: "70%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    top: "5%"
  },
  submitButton: {
    position: "relative",
    color: "white",
    borderRadius: 50,
    width: "100%",
    height: "100%",
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
    top: "5%",
    fontFamily: "Poppins-medium",
  },
  signUptext: {
    color: "royalblue",
    textDecorationLine: "underline",
    fontFamily: "Poppins-medium",
  }


})