import { View, Text } from 'react-native'
import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import FrogetPassword from './FrogetPassword'
import OtpInputs from 'react-native-otp-inputs'
import Header from '../../components/Header'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Otpcode from './Otpcode'
export default function Landing() {
    const Stack = createStackNavigator();
    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown:false
                }}>
                <Stack.Screen name='SignIn' component={SignIn}></Stack.Screen>
                <Stack.Screen name='SignUp' component={SignUp}></Stack.Screen>
                <Stack.Screen name='FrogetPassword' component={FrogetPassword}></Stack.Screen>
                <Stack.Screen name='Otpcode' component={Otpcode}></Stack.Screen>
               
                
            </Stack.Navigator>
    )

}