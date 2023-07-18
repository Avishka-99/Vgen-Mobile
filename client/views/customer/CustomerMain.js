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
export default function CustomerMain() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={
            {
                tabBarStyle: {
                    position: 'absolute',
                    height: 80,
                    borderRadius: 30,
                    left: 10,
                    right: 10,
                    elevation: 7,
                    shadowColor: 'black',
                    shadowOffset: { width: 3, height: 3 },
                    backgroundColor: '#fff',
                    bottom: 10,
                    

                }
            }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name="home" size={24} color={focused ? "#76B693" : "#8B8B8B"} />
                    ),
                }} />
            <Tab.Screen name="Categories" component={Categories}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name="search" size={24} color={focused ? "#76B693" : "#8B8B8B"} />
                    ),
                }}
            />
            <Tab.Screen name="Community" component={Community}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5 name="users" size={24} color={focused ? "#76B693" : "#8B8B8B"} />
                    ),
                }}
            />
            <Tab.Screen name="Feed" component={Feed}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="dynamic-feed" size={24} color={focused ? "#76B693" : "#8B8B8B"} />
                    ),
                }}
            />
            <Tab.Screen name="Account" component={Account}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'dodgerblue',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="account" size={24} color={focused ? "#76B693" : "#8B8B8B"} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}