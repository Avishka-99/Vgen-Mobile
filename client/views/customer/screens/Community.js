import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Card from '../../../components/Card';
import {FlashList} from '@shopify/flash-list';
import {FAB} from 'react-native-elements';
//import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
export default function Community() {
	var user = useSelector((state) => state.userReducer.user);
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: 0,
			backgroundColor: '#E6E6E6',
			height: Dimensions.get('screen').height / 0.9,
		},
		container_2: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white',
		},
		image: {
			resizeMode: 'cover',
			position: 'absolute',
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
			opacity: 0.2,
			marginTop: 80,

			// marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
		},
	});
	const restaurants = [
		{
			id: 1,
			image: 'barista.png',
			name: 'Barista',
			location: 'Reid Aveue',
			rating: 4.5,
		},
		{
			id: 2,
			image: 'pizzahut.png',
			name: 'Pizza hut',
			location: 'Havlock',
			rating: 4.2,
		},
		{
			id: 3,
			image: 'srivihar.jpg',
			name: 'Sri Vihar',
			location: 'Thunmulla',
			rating: 4.6,
		},
		{
			id: 4,
			image: 'nelumkole.jpg',
			name: 'Nelum kole',
			location: 'Thimbirigasyaya',
			rating: 4.3,
		},
		{
			id: 5,
			image: 'savinra.jpg',
			name: 'Savinra',
			location: 'Nugegoda',
			rating: 4.5,
		},
		{
			id: 6,
			image: 'mcdonalds.png',
			name: 'McDonalds',
			location: 'Reid Avenue',
			rating: 4.5,
		},
		{
			id: 7,
			image: 'mayumi.jpg',
			name: 'Mayumi Home Foods',
			location: 'Nawala',
			rating: 4.7,
		},
		{
			id: 8,
			image: 'kfc.jpg',
			name: 'KFC',
			location: 'Nugegoda',
			rating: 4.2,
		},
		{
			id: 9,
			image: 'elite.jpg',
			name: 'Elite',
			location: 'Bambalapitiya',
			rating: 4.4,
		},
		{
			id: 10,
			image: 'elina.webp',
			name: 'Elina Foods',
			location: 'Kirulapone',
			rating: 4.8,
		},
		{
			id: 11,
			image: 'saveira.jpg',
			name: 'Saveira',
			location: 'Kohuwala',
			rating: 4.9,
		},
		{
			id: 12,
			image: 'gogreen.jpg',
			name: 'Go Green',
			location: 'Townhall',
			rating: 4.7,
		},
	];
	const MyCommunities = () => {
		return (
			<View style={{flex: 1, justifyContent: 'center'}}>
				<FlashList data={restaurants} renderItem={({item}) => <Card type='community' />} estimatedItemSize={restaurants.length} />
				<FAB title='Create' style={{position: 'absolute', left: '74%', top: '80%'}} />
			</View>
		);
	};
	const ExploreCommunities = () => {
		return (
			<View>
				<Text>Explore communities</Text>
			</View>
		);
	};
	const Tab = createMaterialTopTabNavigator();
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: {fontSize: 12},
				tabBarStyle: {borderBottomColor: 'yellow', shadowColor: 'red'},
			}}
		>
			<Tab.Screen name='My Communities' component={MyCommunities} />
			<Tab.Screen name='Explore' component={ExploreCommunities} />
		</Tab.Navigator>
	);
}
