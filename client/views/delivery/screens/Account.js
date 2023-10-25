import { View, Text, StyleSheet, StatusBar, ImageBackground, Dimensions, Image, Switch, Alert, TextInput,ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../../actions/UserAction';
//import SwitchSelector from 'react-native-switch-selector';
//import Header from '../../../components/Header';
import Switchbutton from '../../../components/Switchbutton';
import Button from '../../../components/Button';
import Dropdwon from '../../../components/Dropdwon';
import { Feather } from '@expo/vector-icons';
export default function Account() {
  //const dispatch = useDispatch();

  const [iconName, seticonName] = useState('')
  const [ico, setico] = useState('')
  const [myview, setmyview] = useState(false)
  const [value,setvalu]=useState('')
  const [Name,setName]=useState('')
  const [datobj,setdataobj]=useState({})
  
  const switchChanges = (value) => {
    if (value.val ==='1') {
      seticonName('chevron-right')
      setico('')
      setName('')
      setmyview(true)
      setdataobj({})
    } else {
      setico('chevron-left')
      setName('edit')
      setmyview(false)
      seticonName('')
      setdataobj(dataObject)
      
    }
  }
  
  const val = [
    { label: 'Colombo', value: '1' },
    { label: 'Kurunagela', value: '2' },
    { label: 'Gall', value: '3' },
    { label: 'Kandy', value: '4' },
    { label: 'Anuradapura', value: '5' },
    { label: 'Trinco', value: '6' },
    { label: 'Hambanthota', value: '7' },
    { label: 'Kegalla', value: '8' },
  ];

  //sen validate data for backend
  //inputfild data get for usestate 
  const[password,setpassword]=useState('')
  const[comfromePass,setcomfromepass]=useState('')
  const[usernaem,setusername]=useState('')
  const[avalebletime,setavalebletime]=useState('')
  const[AccountNo,setAccountNo]=useState('')
  const[address,setaddress]=useState('')
  const[distric,setdistric]=useState('')
  const [image, setImage] = useState(null);
  const[phoneNO,setphoneNo]=useState('')

   //image picker function
   const picimage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result)=>{

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }

    })
  }
  
  const dataObject={
    password:password,
    comfromePass:comfromePass,
    usernaem:usernaem,
    avalebletime:avalebletime,
    AccountNo:AccountNo,
    address:address,
    distric:val[Number(value)].label,
    phoneNO:phoneNO,
    profil:image

  };

  
//validat data send back end
  const back = () => {
    const upercase=/[A-Z]/;
    const lowercase=/[a-z]/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const timePattern =  /^(?:[01]\d|2[0-3]):[0-5]\d$/;
 
    console.log("hellow click me")
    console.log(datobj)
  }
 
  



  return (

    <View style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={require('../../../assets/back.png')}>
        {/* <View><Header func={back} name={'bell'} sty={styles.Header} /></View> */}
        <View style={styles.content}>
          <View style={styles.profile}>
            <View style={styles.profileBackgrund}>
              <Image style={{ position: 'absolute', height: 125, width: 120, bottom: 10, left: 40,borderRadius:200 }} source={ image?{uri:image}:require('../../../assets/avatar.png')} />
              <View style={{ width: 215, height: 40, position: 'absolute', top:85, borderRadius: 50, left:0, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{flexDirection:'row'}}><Text style={{ fontSize: 18, fontFamily: 'Poppins-medium',color:'green',fontWeight:600 }}>Karen Allen</Text><Feather name={Name} size={20} color={"green"} style={{marginTop:4,marginLeft:18}} onPress={ picimage}/></View>
              </View>
            </View>
            <Switchbutton icon2={ico} icon={iconName} func={switchChanges} />
          </View>
          <View style={styles.editData}>
            <View style={styles.profileData}>
              {myview ?<View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 10, marginTop: 15, fontFamily: 'Poppins-semibold' }}>I have 12 years experience in delivering Industry.</Text><Text style={{ fontSize: 10, fontFamily: 'Poppins-semibold' }}>Hello! This is Karen Allen,</Text></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15 }}>Vehicle Type : </Text><View><Feather name='truck' size={20} /></View></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15 }}>Vehicle No :</Text><Text style={{ fontSize: 15 }}>AASS-2345</Text></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15 }}>Available Time :</Text><Text style={{ fontSize: 15 }}> 8.00 a.m - 7.00 p.m</Text></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Feather name='map-pin' size={25} color={"#7EB693"} /><Text style={{ color: 'black', fontSize: 15, marginTop: 3, marginLeft: 10 }}>:colombo</Text></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Feather name='phone' size={25} color={"#7EB693"} /><Text style={{ color: 'black', fontSize: 13, marginTop: 3, marginLeft: 10 }}>:077-1780073</Text></View>
              </View> :
              <ScrollView>
               <View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row',marginBottom:5 }}><Text style={{ color: '#7EB693', fontSize: 15, marginTop: 4 }}>Password :</Text><TextInput style={{ width: '70%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15 }} placeholder='Password' secureTextEntry={true} onChangeText={(val)=>setpassword(val)} /></View>
                <View style={{ marginStart: 29, marginTop: 20, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15, marginTop: 4 }}>comfrome:</Text><TextInput style={{ width: '70%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15 }} placeholder='comrome password' secureTextEntry={true} onChangeText={(val)=>setcomfromepass(val)}/></View>
                <View style={{ marginStart: 29, marginTop: 20, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15, marginTop: 4 }}>user name :</Text><TextInput style={{ width: '70%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15 }} placeholder='user name' onChangeText={(val)=>setusername(val)}/></View>
                <View style={{ marginStart: 29, marginTop: 20, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15, marginTop: 4 }}>Available Time :</Text><TextInput style={{ width: '62%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15 }} placeholder='8.00am-7.00pm' onChangeText={(val)=>setavalebletime(val)} /></View>
                <View style={{ marginStart: 29, marginTop: 20, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15, marginTop: 4 }}>Account NO:</Text><TextInput style={{ width: '70%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15 }} placeholder='Account NO' onChangeText={(val)=>setAccountNo(val)} /></View>
                <View style={{ marginStart: 29, marginTop: 20, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15, marginTop: 4 }}>Address:</Text><TextInput style={{ width: '70%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15 }} placeholder='Address' onChangeText={(val)=>setaddress(val)} /></View>
                <View style={{ marginStart: 29, marginTop: 20, flexDirection: 'row' }}><Feather name='map-pin' size={25} color={"#7EB693"} /><Dropdwon data={val} getdata={setvalu} /></View>
                <View style={{ marginStart: 29, marginTop: 20, flexDirection: 'row' }}><Feather name='phone' size={25} color={"#7EB693"} /><TextInput style={{ width: '85%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15, marginLeft: 10 }} placeholder='077-1780073' onChangeText={(val)=>setphoneNo(val)} /></View>
                <View style={{ marginStart: 29, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}><Button custermize={styles.but} func={back} sty={{ fontSize:13 }} butname={"Update"} /></View>
              </View>
              </ScrollView>
              }
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    //backgroundColor:'red',

  },
  content: {
    height: '100%',
    width: '100%',
    // backgroundColor:'red'
  },

  profile: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor:'white'

  },
  editData: {
    height:'70%',
    width: '100%',
    alignItems: 'center',
    //backgroundColor:'green'    
  },
  profileBackgrund: {
    width: 200,
    height: 100,
    //backgroundColor: '#7EB693',
    borderTopRightRadius: 100,
    borderTopLeftRadius: 90
  },
  profileData: {
    width: '90%',
    height: '67%',
    marginTop:'13%',
    marginBottom:'10%',
   // position:'absolute',
    //marginEnd:5,
    elevation: 7,
    // marginLeft:29,
    borderRadius: 40,
    backgroundColor: '#fff'
  },
  but: {
    width: 100,
    marginEnd:25,
    marginBottom:15
    //marginLeft:100
  },
  Header:{
    marginTop:0
  }
})

