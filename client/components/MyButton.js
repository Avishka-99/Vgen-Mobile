import React, { Component } from 'react'
import { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { incrementRedButton } from '../actions/redButtonActions';
const MyButton = () => {
    const counter = useSelector(state => state.redButtonReducer.counterRed);
    const dispatch = useDispatch();

    const increaseCounter = (parameter) => {
        dispatch(incrementRedButton(parameter));
    };

    return (
        <View style={style.back} >
            <Text onPress={() => increaseCounter(1)}>{counter}</Text>
        </View>
    )
}
const style = StyleSheet.create({
    back: {
        backgroundColor: "tomato",
        width: "50%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",

    }
})
export default MyButton;