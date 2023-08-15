import {View, Text, StyleSheet, Button, ScrollView, Dimensions, FlatList, StatusBar, NativeEventEmitter, RefreshControl} from 'react-native';
import React, {useRef, useState, useMemo, useEffect} from 'react';
import {Image} from 'expo-image';
import {FlashList} from '@shopify/flash-list';
import SearchBar from '../../../components/SearchBar';
import PopularProducts from '../segments/PopularProducts';
import Card from '../../../components/Card';
import DeliverAddress from '../segments/DeliverAddress';
import {Animated} from 'react-native';
import * as Device from 'expo-device';
import Bottomsheet from '../../../components/Bottomsheet';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backdrop from '../../../components/Backdrop';
import Axios from '../../../api/Axios';
import {useSelector, useDispatch} from 'react-redux';
import * as API_ENDPOINTS from '../../../api/ApiEndpoints';
import * as ALL_ACTIONS from '../../../actions/AllActions';
const {diffClamp} = Animated;
export default function Home({navigation}) {
	const dispatch = useDispatch();
	const [scrollY, setScrollY] = useState(new Animated.Value(0));
	const [storeInfo, setstoreInfo] = useState(null);
	const [favRestaurats, setFavRestaurants] = useState('');
	const HEADER_HEIGHT = Dimensions.get('screen').height / 14;
	const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			Axios.post(API_ENDPOINTS.FETCH_RESTAURANT_DETAILS).then((response) => {
				dispatch(ALL_ACTIONS.setRestaurantAction(response.data));
			});
			setRefreshing(false);
		}, 2000);
	}, []);
	const headerTranslateY = diffClamp.interpolate({
		inputRange: [0, HEADER_HEIGHT],
		outputRange: [0, -HEADER_HEIGHT],
		extrapolate: 'clamp',
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
	const restaurantArray = useSelector((state) => state.restaurantReducer.restaurants);
	console.log(useSelector((state) => state.userReducer.userLocation.lang));
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
	const bottomSheetModalRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ['98%'], []);

	const openModal = (data) => {
		setstoreInfo(data);
		bottomSheetModalRef.current.present();
	};
	const CloseModal = () => {
		//console.log('sdsd')
		bottomSheetModalRef.current.close();
	};
	const setFavouriteStore = async (id) => {
		if (favRestaurats.includes(id)) {
			console.log('hello world');
			// const index = favRestaurats.indexOf(id)
			// if (index > -1) {
			// 	// only splice array when item is found
			// 	setFavRestaurants(favRestaurats.splice(index, 1)); // 2nd parameter means remove one item only
			// }
		} else {
			console.log('hello');
			// setFavRestaurants(favRestaurats.push(id))
		}
		// const favStores = await AsyncStorage.getItem('favStores');
		// const array = JSON.parse(favStores);
		// array.push(id);
		// await AsyncStorage.setItem('favStores', JSON.stringify(array));
		// setFavRestaurants(array);
		// console.log(array);
	};
	useEffect(() => {
		Axios.post(API_ENDPOINTS.FETCH_RESTAURANT_DETAILS).then((response) => {
			dispatch(ALL_ACTIONS.setRestaurantAction(response.data));
		});
	}, []);
	return (
		<View style={styles.container}>
			<Animated.View style={[{transform: [{translateY: headerTranslateY}]}]}>
				<DeliverAddress />
			</Animated.View>
			<Animated.View style={[styles.container_2, {transform: [{translateY: headerTranslateY}]}]}>
				<SearchBar />
				<Animated.ScrollView
					style={{flex: 1, width: '100%'}}
					onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}
					scrollEventThrottle={16}
					contentContainerStyle={{
						flexGrow: 1,
						// justifyContent: 'center',
						alignItems: 'center',
					}}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					{restaurantArray.map((item) => (
						<Card key={item.userId} onPress={openModal} isFav={favRestaurats.includes(item.id) ? true : false} favStore={setFavouriteStore} details={item} type='store' name={item.restaurant_manager.resturantName} location={item.city} rating={item.rating} image={item.restaurant_manager.image} />
					))}

					{/* {restaurants.map((item) => (
						<Card onPress={openModal} isFav={favRestaurats.includes(item.id) ? true : false} favStore={setFavouriteStore} key={item.id} details={item} type='store' name={item.name} location={item.location} rating={item.rating} image={item.image} />
					))} */}
					<Card key={1} type='empty' />
				</Animated.ScrollView>
			</Animated.View>
			<Portal>
				<BottomSheetModal backgroundComponent={null} backdropComponent={Backdrop} ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
					<Bottomsheet closeFun={CloseModal} info={storeInfo} />
				</BottomSheetModal>
				{/* <Modal swipeDirection={'down'} isVisible={isModalVisible}>
					<View style={{flex: 1}}>
						<Text>Hello!</Text>

						<Button title='Hide modal' onPress={toggleModal} />
					</View>
				</Modal> */}
			</Portal>
			<PortalHost name='customer_main' />
		</View>
	);
}
