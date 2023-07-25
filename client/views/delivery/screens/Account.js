import { View, Text, StyleSheet, StatusBar, ImageBackground, Dimensions, Image, Switch, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../../actions/UserAction';
//import SwitchSelector from 'react-native-switch-selector';
import Header from '../../../components/Header';
import Switchbutton from '../../../components/Switchbutton';
import Button from '../../../components/Button';
import Dropdwon from '../../../components/Dropdwon';
import { Feather } from '@expo/vector-icons';
export default function Account() {
  //const dispatch = useDispatch();

  const [iconName, seticonName] = useState('')
  const [ico, setico] = useState('')
  const [myview, setmyview] = useState(true)
  const [image, setImage] = useState(null);
  const [Name,setName]=useState('')
  const switchChanges = (value) => {
    if (value.val === '1') {
      seticonName('chevron-right')
      setico('')
      setName('')
      setmyview(true)
    } else {
      setico('chevron-left')
      setName('edit')
      setmyview(false)
      seticonName('')
      
    }
  }
  const back = () => {
    // accont back button
    //dispatch(setUserAction('Signin'))
    console.log("hellow click me")
  }
  // drop dwon data filed
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

  return (

    <View style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={require('../../../assets/back.png')}>
        <View><Header func={back} name={'bell'} /></View>
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

              {myview ? <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 10, marginTop: 15, fontFamily: 'Poppins-semibold' }}>I have 12 years experience in delivering Industry.</Text><Text style={{ fontSize: 10, fontFamily: 'Poppins-semibold' }}>Hello! This is Karen Allen,</Text></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15 }}>Vehicle Type : </Text><View><Feather name='truck' size={20} /></View></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15 }}>Vehicle No :</Text><Text style={{ fontSize: 15 }}>AASS-2345</Text></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15 }}>Available Time :</Text><Text style={{ fontSize: 15 }}> 8.00 a.m - 7.00 p.m</Text></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Feather name='map-pin' size={25} color={"#7EB693"} /><Text style={{ color: 'black', fontSize: 15, marginTop: 3, marginLeft: 10 }}>:colombo</Text></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Feather name='phone' size={25} color={"#7EB693"} /><Text style={{ color: 'black', fontSize: 13, marginTop: 3, marginLeft: 10 }}>:077-1780073</Text></View>
              </View> : <View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}><TextInput style={{ width: '80%', height: 50, borderColor: 'green', borderWidth: 1, borderRadius: 15, paddingLeft: 20, color: 'black' }} selectionColor={'green'} placeholder='discription' /></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15, marginTop: 4 }}>Vehicle No :</Text><TextInput style={{ width: '70%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15 }} placeholder='user name' /></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Text style={{ color: '#7EB693', fontSize: 15, marginTop: 4 }}>Available Time :</Text><TextInput style={{ width: '62%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15 }} placeholder='8.00am-7.00pm' /></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Feather name='map-pin' size={25} color={"#7EB693"} /><Dropdwon data={val}/></View>
                <View style={{ marginStart: 29, marginTop: 25, flexDirection: 'row' }}><Feather name='phone' size={25} color={"#7EB693"} /><TextInput style={{ width: '85%', height: 30, borderColor: 'green', borderRadius: 15, borderWidth: 1, paddingLeft: 15, marginLeft: 10 }} placeholder='077-1780073' /></View>
                <View style={{ marginStart: 29, marginTop: 25, justifyContent: 'center', alignItems: 'center' }}><Button custermize={styles.but} func={back} sty={{ fontSize:13 }} butname={"Update"} /></View>

              </View>}


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
    height: '70%',
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
    marginTop: 30,
    //marginEnd:5,
    elevation: 7,
    // marginLeft:29,
    borderRadius: 40,
    backgroundColor: '#fff'
  },
  but: {
    width: 100,
    marginEnd:25,
    marginTop:0,
    //marginLeft:100
  }
})





// <Button title='Log out' onPress={() => {
//   dispatch(setUserAction(''))
// }}></Button>