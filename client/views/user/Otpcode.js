import React from 'react';
import { useState } from 'react';
import { View,Text,KeyboardAvoidingView,ImageBackground,TouchableOpacity, Dimensions,StyleSheet,StatusBar } from 'react-native';
import { Image } from 'expo-image';
import Header from '../../components/Header';
import TextInputField from '../../components/TextInputField';
import RoundedButton from '../../components/RoundedButton';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button';
function Otpcode({navigation}) {
  //  const [otp, setOtp] = useState('');
  const[email,setEmail]=useState('')

  const FrogetPasswordView=()=>{
    // console.log(name)
    navigation.navigate('FrogetPassword');
 }

 const changeView=()=>{
    console.log('nav change screen')
 }




    return (
 <KeyboardAvoidingView style={{flex:1,marginTop:StatusBar.currentHeight}}> 
      
    <ImageBackground source={require('../../assets/back.png')}  style={{flex:1,}}>
           <View><Header  func={FrogetPasswordView}/></View> 
           <View style={{width:Dimensions.get('window').width,height:'35%',alignItems:'center',opacity:9}}>
               <Text  style={{fontSize:25,marginTop:40,color:'black',fontFamily:"Poppins-light",fontWeight:600}}>Verify OTP</Text>
               <View style={{width:200,height:200,paddingLeft:10,backgroundColor:'white',marginTop:30,borderRadius:100,elevation:10}}>
                   <Image style={{width:180,height:180,borderRadius:100}} source={require('../../assets/otp.png')}/>
               </View>
           </View>
             <View style={{width:Dimensions.get('window').width,height:400,marginTop:0,alignItems:'center'}}>
                 <Text style={{fontSize:12,marginTop:50,fontWeight:400}}>Please enter 6 digit OTP code that sent to,</Text>
                 <Text style={{fontSize:12,fontWeight:400,fontWeight:400}}> daweendrihimasha98@gmail.com.</Text>
                 <TextInputField isSecured={false} iconType={Feather} iconProps={{ "name": "user", "size": 24 }} height="8%" placeholder="Email" function={setEmail} styMargin={{marginTop:20}} />
                 <Button func={changeView} butname={"Next"}/>
             </View>
    </ImageBackground>

</KeyboardAvoidingView>
    );
}

export default Otpcode;



