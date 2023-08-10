import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {NGROK_URL, RESTAURANT_IMG_PATH} from '../constants/Constants';
import * as Icons from '../constants/Icons';
import {BaseButton, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapView, {Marker} from 'react-native-maps';
import Axios from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
export default function Bottomsheet(props) {
	console.log(props);
	const Stack = createNativeStackNavigator();
	const StoreHome = ({navigation}) => {
		useEffect(()=>{
			Axios.post(API_ENDPOINTS.FETCH_RESTAURANT_PRODUCTS,{
				restaurantId:props.info.userId
			}).then((response)=>{
				console.log(response.data)
			})
		})
		return (
			<View style={styles.container}>
				<View style={styles.StoreBottomSheetRow1}>
					<Image
						style={{
							height: '100%',
							width: '100%',
							opacity: 0.9,
						}}
						source={{uri: NGROK_URL + RESTAURANT_IMG_PATH + props.info.restaurant_manager.image}}
					/>
					<LinearGradient style={styles.gradient} colors={['transparent', 'rgba(0,0,0,0.8)']}>
						<View style={styles.restaurantDetails}>
							<View style={{height: '70%'}}>
								<Text style={{color: 'white', fontSize: 24}}>{props.info.restaurant_manager.resturantName}</Text>
							</View>
							<View style={{top: -10, flexDirection: 'row', alignItems: 'center'}}>
								<Icons.AntDesign name='star' size={16} color={'white'} />
								<Text style={{color: 'white', fontSize: 16, left: 4}}>{props.info.rating}</Text>
							</View>
						</View>
					</LinearGradient>
					<BaseButton style={{position: 'absolute', left: '88%', top: '3%'}} onPress={props.closeFun}>
						<View style={styles.CloseButton}>
							<Icons.EvilIcons name='close' size={30} color={'black'} />
						</View>
					</BaseButton>
					<BaseButton style={{position: 'absolute', left: '88%', top: '30%'}} onPress={() => navigation.navigate('StoreLocation')}>
						<View style={styles.CloseButton}>
							<Icons.EvilIcons name='location' size={30} color={'black'} />
						</View>
					</BaseButton>
				</View>
			</View>
		);
	};

	const StoreLocation = ({navigation}) => {
		return (
			<View style={styles.mapContainer}>
				<MapView
					initialRegion={{
						latitude: props.info.restaurant_manager.latitude,
						longitude: props.info.restaurant_manager.longitude,
						latitudeDelta: 0.0002,
						longitudeDelta: 0.0131,
					}}
					style={{width: '100%', height: '100%'}}
				>
					<Marker
						coordinate={{
							latitude: props.info.restaurant_manager.latitude,
							longitude: props.info.restaurant_manager.longitude,
						}}
					/>
				</MapView>
				<BaseButton style={{position: 'absolute', top: '2%', left: '3%'}} onPress={() => navigation.navigate('StoreHome')}>
					<View style={[styles.CloseButton, {backgroundColor: 'black'}]}>
						<Icons.Ionicons name='chevron-back' size={30} color={'white'} />
					</View>
				</BaseButton>
			</View>
		);
	};

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='StoreHome' component={StoreHome} />
				<Stack.Screen name='StoreLocation' component={StoreLocation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '90%',
		backgroundColor: '#F5F5F5',
	},
	StoreBottomSheetRow1: {
		flex: 1 / 3,
	},
	CloseButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'white',
		shadowColor: '#171717',
		shadowOffset: {width: -2, height: 4},
		shadowOpacity: 0.2,
		shadowRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	gradient: {
		position: 'absolute',
		width: '100%',
		height: '100%',
	},
	restaurantDetails: {
		width: '100%',
		height: '30%',
		position: 'absolute',
		top: '70%',
	},
	/*STORE LOCATION */
	mapContainer: {
		flex: 1,
	},
});
