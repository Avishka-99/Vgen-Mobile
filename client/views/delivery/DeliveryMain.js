import { View, Text,Image,ImageBackground } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Delivery from './screens/Delivery';
import Account from './screens/Account';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import CustermuizHeader from '../../components/CustermuizHeader';
export default function CustomerMain() {
    const Tab = createBottomTabNavigator();
    return (
     
        <Tab.Navigator  screenOptions={{tabBarStyle:{
            position:'absolute',
            height:70,
            borderTopStartRadius:30,
            borderTopEndRadius:30,
            left:10,
            right:10,
            elevation:7,
            shadowColor:'black',
            backgroundColor:'#fff',
            bottom:0,
            
        }}}>
            <Tab.Screen name="Delivery" component={Delivery} 
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="delivery-dining" size={24} color={focused ? "dodgerblue" : "black"} />
                    ),
                }} />
            <Tab.Screen name="Account" component={Account}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons  name="account" size={24} color={focused ? "dodgerblue" : "black"} />
                    ),
                }}
            />
        </Tab.Navigator>
   
    )
}