import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform, Touchable } from 'react-native'
import React,{useState} from 'react'
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper'
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from '../../actions/UserAction';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
export default function SignIn({ navigation }) {
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
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
    }).then((response)=>{
      if(response.data.type=='Customer'){
        dispatch(setUserAction('customer'))
      }else if(response.data.type=='Delivery'){
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
          source={require('../../assets/signinbg.png')}
          blurRadius={1}
          contentFit="cover"
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
            onChangeText={(event)=>setEmail(event)}
          />
          <TextInput
            mode='outlined'
            label={"Password"}
            style={styles.textInput}
            onChangeText={(event)=>setPassword(event)}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.submitButton} activeOpacity={.9} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <Text style={styles.bottomText}>Not a member? <Text style={styles.signUptext} onPress={() => navigation.navigate('SignUp')}>Sign up</Text></Text>
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
  logo: {
    flex: 1,
    position: 'absolute',
    width: "90%",
    height: "30%",
    marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
    left: "5%",
    top: "12%",

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
    position: "relative",
    backgroundColor: "dodgerblue",
    color: "white",
    borderRadius: 50,
    width: "80%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    top: "5%"
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