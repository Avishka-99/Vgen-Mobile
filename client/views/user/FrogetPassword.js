import React from 'react';
import { useState } from 'react';
import { View,Text,KeyboardAvoidingView,ImageBackground,TouchableOpacity, Dimensions,StyleSheet,StatusBar } from 'react-native';
import { Image } from 'expo-image';
import Header from '../../components/Header';
import TextInputField from '../../components/TextInputField';
import RoundedButton from '../../components/RoundedButton';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button';
function FrogetPassword({navigation}) {
    const[email,setEmail]=useState('')
    const signin=()=>{
        // console.log(name)
        navigation.navigate('SignIn');
     }

    const otpview=()=>{
        navigation.navigate('Otpcode')
    } 
    return (
        <KeyboardAvoidingView style={{flex:1,marginTop:StatusBar.currentHeight}}> 
                 <StatusBar/>
             <ImageBackground source={require('../../assets/back.png')}  style={{flex:1,}}>
                    <View><Header  func={signin} name={''}/></View> 
                    <View style={{width:Dimensions.get('window').width,height:'35%',alignItems:'center',opacity:9}}>
                        <Text  style={{fontSize:25,marginTop:40,color:'black',fontFamily:"Poppins-light",fontWeight:600}}>Forgot  Password</Text>
                        <View style={{width:200,height:200,paddingLeft:20,backgroundColor:'white',marginTop:30,borderRadius:100,elevation:10}}>
                            <Image style={{width:180,height:180,borderRadius:100}} source={require('../../assets/froget.png')}/>
                        </View>
                    </View>
                      <View style={{width:Dimensions.get('window').width,height:400,marginTop:0,alignItems:'center'}}>
                          <Text style={{fontSize:10,marginTop:50,fontWeight:400}}>Please enter the email address used to register your account</Text>
                          <Text style={{fontSize:10,fontWeight:400,fontWeight:400}}> and we will email you an OTP to reset password.</Text>
                          <TextInputField isSecured={false} iconType={Feather} iconProps={{ "name": "user", "size": 24 }} height="8%" placeholder="Email" function={setEmail} stl={{width:350,height:60,marginTop:15,backgroundColor:'#EFF6F1'}}/>
                          <Button navotp={otpview}/>
                      </View>
             </ImageBackground>

        </KeyboardAvoidingView>
    );
}

// const styles=StyleSheet.create({
//     button:{
//         width:200,
//         height:50,
//         borderRadius:30,
//         marginTop:60,
//         backgroundColor:'#7EB693',
//         alignItems:'center',
//         justifyContent:'center',
//     }
// })

export default FrogetPassword;