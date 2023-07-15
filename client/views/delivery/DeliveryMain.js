import { View, Text,Image,ImageBackground } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Delivery from './screens/Delivery';
import Account from './screens/Account';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function CustomerMain() {
    const Tab = createBottomTabNavigator();
    return (
     
        <Tab.Navigator  screenOptions={{tabBarStyle:{
            position:'absolute',
            height:80,
            borderRadius:30,
            left:20,
            right:20,
            elevation:7,
            shadowColor:'black',
            shadowOffset:{width:3,height:3},
            backgroundColor:'#fff',
            bottom:10,
            
        }}}>
            <Tab.Screen name="Delivery" component={Delivery} 
                 
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel:false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="delivery-dining" size={34} color={focused ? "dodgerblue" : "black"} />
                    ),
                }} />
            <Tab.Screen name="Account" component={Account}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel:false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons  name="account" size={34} color={focused ? "dodgerblue" : "black"} />
                    ),
                }}
            />
        </Tab.Navigator>
   
    )
}