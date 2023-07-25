import React from 'react';
import { Text,View,StyleSheet,Image, Dimensions,ImageBackground,TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

function Header(props) {
   
    return (
       <View  style={[styles.HeaderView,props.sty]} >
          <ImageBackground style={{width:Dimensions.get('window').width,height:70}}>
              <View style={styles.imageBacbutton} >
                <TouchableOpacity onPress={()=>props.func()}><Feather style={{marginTop:16,marginLeft:10}} name='arrow-left'size={35}/></TouchableOpacity>
                  <Image style={{width:100,height:70,marginLeft:20,marginTop:4}} source={require('../assets/vgfen.png')}/>
                 <View ><Feather style={{width:20,height:20,marginLeft:170,marginTop:24,borderRadius:100}} name={props.name} size={20} color={"black"} /></View> 
              </View>
          </ImageBackground>

         
       </View>
    );
}

const  styles=StyleSheet.create({
    HeaderView:{
       width:Dimensions.get('window').width,
       height:70,
       elevation:27,
       marginLeft:15,
       flexDirection:'row',
       shadowOffset:{width:4,height:4},
       shadowColor:'#EFF6F1',
       marginTop:0
      // backgroundColor:'red'
    },
    imageBacbutton:{
        height:70,
        width:'100%',
        flexDirection:'row',
       
       // backgroundColor:'black'
    }
})

export default Header;