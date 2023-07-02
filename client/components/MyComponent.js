import React, { useEffect, useState } from 'react'
import { Text, View, Button, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { incrementCounterAction, decrementCounterAction } from '../actions/counterAction';
const MyComponent = () => {
    useEffect(() => {
        console.log("MyComponent")
    })
    const counter = useSelector(state => state.counterReducer.counter);
    const dispatch = useDispatch();

    const increaseCounter = (parameter) => {
        console.log(counter)
        dispatch(incrementCounterAction(parameter));
    };

    const decreaseCounter = () => {
        dispatch(decrementCounterAction());
    };
    return (
        <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginVertical: 50 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Counter Value = {counter} </Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Button title="{counter}" style={{ marginVertical: 50 }} onPress={() => { increaseCounter(1) }} />
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Button title="Increment +5" style={{ marginVertical: 50 }} onPress={() => { increaseCounter(5) }} />
                </View>
                <View style={{ marginVertical: 50 }}>
                    <Button title="Decrement -1" onPress={() => { decreaseCounter() }} />
                </View>
                <View style={{ marginVertical: 50 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Counter Value = {counter} </Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Button title="{counter}" style={{ marginVertical: 50 }} onPress={() => { increaseCounter(1) }} />
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Button title="Increment +5" style={{ marginVertical: 50 }} onPress={() => { increaseCounter(5) }} />
                </View>
                <View style={{ marginVertical: 50 }}>
                    <Button title="Decrement -1" onPress={() => { decreaseCounter() }} />
                </View>
                <View style={{ marginVertical: 50 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Counter Value = {counter} </Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Button title="{counter}" style={{ marginVertical: 50 }} onPress={() => { increaseCounter(1) }} />
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Button title="Increment +5" style={{ marginVertical: 50 }} onPress={() => { increaseCounter(5) }} />
                </View>
                <View style={{ marginVertical: 50 }}>
                    <Button title="Decrement -1" onPress={() => { decreaseCounter() }} />
                </View>
            </View>
        </ScrollView>
    )
}
export default MyComponent;