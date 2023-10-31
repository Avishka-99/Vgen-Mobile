import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Categories from './screens/Categories';
import Cart from './screens/Cart';
import Home from './screens/Home';
import Community from './screens/Community';
import Menu from './screens/Menu';
import {Entypo, Feather, Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SimpleLineIcons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
export default function CustomerMain() {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					position: 'absolute',
					height: Dimensions.get('screen').height / 8,
					borderRadius: 30,
					elevation: 5,
					shadowColor: 'black',
					shadowOffset: {width: 5, height: 5},
					backgroundColor: '#fff',
					bottom: 10,
					borderWidth: 3,
					borderTopWidth: 3,
					borderColor: '#76B693',
					borderTopColor: '#76B693',
					width: '98%',
					left: '1%',
				},
			}}
		>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					headerShown: false,
					tabBarInactiveTintColor: 'black',
					tabBarActiveTintColor: 'dodgerblue',
					tabBarShowLabel: false,
					tabBarIcon: ({color, focused}) => <Feather name='home' size={30} color={focused ? '#76B693' : '#8B8B8B'} />,
					// tabBarHideOnKeyboard:true
				}}
			/>
			<Tab.Screen
				name='Categories'
				component={Categories}
				options={{
					headerShown: false,
					tabBarInactiveTintColor: 'black',
					tabBarActiveTintColor: 'dodgerblue',
					tabBarShowLabel: false,
					tabBarIcon: ({color, focused}) => <Feather name='search' size={30} color={focused ? '#76B693' : '#8B8B8B'} />,
				}}
			/>
			<Tab.Screen
				name='Community'
				component={Community}
				options={{
					headerShown: false,
					tabBarInactiveTintColor: 'black',
					tabBarActiveTintColor: 'dodgerblue',
					tabBarShowLabel: false,
					tabBarIcon: ({color, focused}) => <FontAwesome5 name='users' size={30} color={focused ? '#76B693' : '#8B8B8B'} />,
				}}
			/>
			<Tab.Screen
				name='Cart'
				component={Cart}
				options={{
					headerShown: false,
					tabBarInactiveTintColor: 'black',
					tabBarActiveTintColor: 'dodgerblue',
					tabBarShowLabel: false,
					//tabBarStyle:{display:'none'},
					tabBarIcon: ({color, focused}) => <Feather name='shopping-cart' size={30} color={focused ? '#76B693' : '#8B8B8B'} />,
				}}
			/>
			<Tab.Screen
				name='Account'
				component={Menu}
				options={{
					headerShown: false,
					tabBarInactiveTintColor: 'black',
					tabBarActiveTintColor: 'dodgerblue',
					tabBarShowLabel: false,
					tabBarIcon: ({color, focused}) => <Entypo name='grid' size={49} color={focused ? '#76B693' : '#8B8B8B'} />,
				}}
			/>
		</Tab.Navigator>
	);
}
