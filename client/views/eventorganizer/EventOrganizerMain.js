import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Categories from './screens/Categories';
import Feed from './screens/Feed';
import Home from './screens/Home';
import Community from './screens/Community';
import Account from './screens/Account';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function EventOrganizerMain() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name="home" size={24} color={focused ? "dodgerblue" : "black"} />
                    ),
                }} />
            <Tab.Screen name="Categories" component={Categories}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name="search" size={24} color={focused ? "dodgerblue" : "black"} />
                    ),
                }}
            />
            <Tab.Screen name="Community" component={Community}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5 name="users" size={24} color={focused ? "dodgerblue" : "black"} />
                    ),
                }}
            />
            <Tab.Screen name="Feed" component={Feed}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="dynamic-feed" size={24} color={focused ? "dodgerblue" : "black"} />
                    ),
                }}
            />
            <Tab.Screen name="Account" component={Account}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="account" size={24} color={focused ? "dodgerblue" : "black"} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}