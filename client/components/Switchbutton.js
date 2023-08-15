import React from 'react';
import { Feather } from '@expo/vector-icons';
import SwitchSelector from "react-native-switch-selector";
import { View,StyleSheet,Text } from 'react-native';

function Switchbutton(props) {
    const options = [
        { value: '1',customIcon: <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}><Text style={{marginBottom:0,fontFamily:'Poppins-regular',marginStart:10}}>profile info</Text><Feather  name={props.icon} size={29} color={'red'} /></View>},
        { value: '2',customIcon: <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}><Feather  name={props.icon2} size={29} color={'red'} /><Text style={{marginBottom:0,fontFamily:'Poppins-regular',marginEnd:10}}>Edit profile</Text></View> }
       ];
    return (
        <View  style={styles.togelButton} >
                        <SwitchSelector 
                         options={options}
                         initial={0} 
                         onPress={value =>props.func({val:value})}
                         backgroundColor='#7EB693'
                         buttonColor='#ffff'
                         textColor='black'
                         height={50}
                         borderColor={"#cccccc"}
                         elevation={7}
                         hasPadding={true}
                         
                         />   
            </View>
    );
}

const styles=StyleSheet.create({
    togelButton:{
    position:'absolute',
    top:200,
    width:265,
    height:50,
    left:70,
    borderRadius:40,
    backgroundColor:'#7EB693',
    } 
})

export default Switchbutton;