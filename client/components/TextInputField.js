import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import React from 'react'
import * as Device from 'expo-device';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function TextInputField(props) {
    const styles = StyleSheet.create({
        Container: {
            top: props.textInputRow ? props.textInputRow.top ? props.textInputRow.top : 0 : 0,
            marginBottom: props.textInputRow ? props.textInputRow.marginBottom ? props.textInputRow.marginBottom : 0 : 5,
            width: "90%",
            flexDirection: "row",
            height: props.textInputRow ? props.textInputRow.height ? props.textInputRow.height : 60 : 60,
            backgroundColor: "white",
            borderColor: "#7EB693",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            //marginTop:16,
            borderRadius: props.textInputRow ? props.textInputRow.borderRadius ? props.textInputRow.borderRadius : 8 : 8,
            color: "#393E46",
            // height: props.textInputRow.height ? props.textInputRow.height : 10,
            flexDirection: props.textInputRow ? props.textInputRow.reverse ? "row-reverse" : "row" : "row"

        },
        textInput: {
            // width: Device.brand=="Apple"?props.textInput ?props.textInput.width ? props.textInput.width :"90%":"90%":9,
            color: "#393E46",
            paddingLeft: 10,
            width: Device.brand == "Apple" ? props.textInput ? props.textInput.ioswidth ? props.textInput.ioswidth : "90%" : "90%" : "83%"


        },
        iconBackground: {
            height: Device.brand == "Apple" ? Dimensions.get("screen").width / 9 : Dimensions.get("screen").width / 8,
            width: Device.brand == "Apple" ? Dimensions.get("screen").width / 9 : Dimensions.get("screen").width / 8,
            backgroundColor: props.iconProps ? props.iconProps.iconBg ? props.iconProps.iconBg : "transparent" : "transparent",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: props.iconProps ? props.iconProps.radius ? props.iconProps.radius : 5 : 5
        }
    })
    return (
        <View style={[styles.Container,props.styMargin]}>
            <View style={styles.iconBackground}>
                {props.iconType ? <props.iconType name={props.iconProps.name} size={props.iconProps.size ? props.iconProps.size : 25} color={props.iconProps.color ? props.iconProps.color : "#393E46"} /> : <View></View>}
            </View>
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

