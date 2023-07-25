import React from 'react';
import { TouchableOpacity,Text,StyleSheet } from 'react-native';

function Button(props) {
    return (
        <TouchableOpacity style={[styles.button,props.custermize]}  onPress={()=>props.func()}>
            <Text style={[{color:'white',fontWeight:500,fontSize:20},props.sty]}>{props.butname}</Text>
        </TouchableOpacity>
    );
}

const styles=StyleSheet.create({
    button:{
        width:200,
        height:50,
        borderRadius:30,
        marginTop:50,
        backgroundColor:'#7EB693',
        alignItems:'center',
        justifyContent:'center',
    }

})



export default Button;