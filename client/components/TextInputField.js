import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function TextInputField(props) {
    const styles = StyleSheet.create({
        textInputRow: {
            top: "5%",
            width: "80%",
            flexDirection: "row",
            marginBottom: "2%",
            height: props.height?props.height:"12%",
            backgroundColor: "white",
            borderColor: "#7EB693",
            borderWidth: 1,
            alignItems: "center",
            padding: 3,
            borderRadius: 8,
            color: "#393E46",

        },
        textInput: {
            width: "80%",
            color: "#393E46",
            paddingLeft: 10,

        },
    })
    return (
        <View style={styles.textInputRow}>
        {props.iconType?<props.iconType name={props.iconProps.name} size={props.iconProps.size?props.iconProps.size:25} color={props.iconProps.color?props.iconProps.color:"#393E46"} style={{ paddingLeft: 3 }} />:<View></View>}   
            <TextInput
                placeholder={props.placeholder}
                style={styles.textInput}
                onChangeText={(event) => props.function(event)}
                secureTextEntry={props.isSecured}
                placeholderTextColor={'#393E46'}
                selectionColor={'green'}
            />
        </View>
    )
}

