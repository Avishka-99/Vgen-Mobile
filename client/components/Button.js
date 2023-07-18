import React from 'react';
import { TouchableOpacity,Text,StyleSheet } from 'react-native';

function Button(props) {
    return (
        <TouchableOpacity style={[styles.button]}  onPress={()=>props.navotp()}>
            <Text style={{color:'white',fontWeight:500,fontSize:20}}>Get OTP</Text>
        </TouchableOpacity>
    );
}

const styles=StyleSheet.create({
    button:{
        width:200,
        height:50,
        borderRadius:30,
        marginTop:60,
        backgroundColor:'#7EB693',
        alignItems:'center',
        justifyContent:'center',
    }

})



export default Button;