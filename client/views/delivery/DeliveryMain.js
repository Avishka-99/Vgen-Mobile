import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Delivery from './screens/Delivery';
import Account from './screens/Account';
import Home from '../delivery/screens/Home';
import Complen from './screens/Complen';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function CustomerMain() {
    const Tab = createBottomTabNavigator();
    return (

        <Tab.Navigator screenOptions={
            {
                tabBarStyle: {
                    position: 'absolute',
                    height: 70,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius:30,
                    left: 5,
                    right: 5,
                    elevation: 7,
                    shadowColor: 'black',
                    shadowOffset: { width: 3, height: 3 },
                    backgroundColor: '#fff',
                    bottom: 0,

                }
            }}>

                <Tab.Screen name="Home" component={Home}

                    options={{
                        headerShown: false,
                        tabBarInactiveTintColor: 'black',
                        tabBarActiveTintColor: 'dodgerblue',
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialIcons name="home" size={28} color={focused ? "#7EB693" : "black"} />
                        ),
                }} />       


            <Tab.Screen name="Delivery" component={Delivery}

                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="delivery-dining" size={28} color={focused ? "#7EB693" : "black"} />
                    ),
                }} />
            <Tab.Screen name="Account" component={Account}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="account" size={28} color={focused ? "#7EB693" : "black"} />
                    ),
                }}
            />

            <Tab.Screen name="Complen" component={Complen}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="book-edit" size={28} color={focused ? "#7EB693" : "black"} />
                    ),
                }}
            />
        </Tab.Navigator>

    )
}