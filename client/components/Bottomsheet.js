import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NGROK_URL, PRODUCT_IMG_PATH, RESTAURANT_IMG_PATH} from '../constants/Constants';
import * as Icons from '../constants/Icons';
import {BaseButton, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapView, {Marker} from 'react-native-maps';
import Axios from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
import * as ALL_ACTIONS from '../actions/AllActions';
import {useSelector, useDispatch} from 'react-redux';
import Card from './Card';
import {FlashList} from '@shopify/flash-list';
import {Modal, Portal, Button, PaperProvider} from 'react-native-paper';
import {Chip} from 'react-native-paper';
import CounterInput from 'react-native-counter-input';
import {CardField, confirmPayment, useConfirmPayment,useStripe} from '@stripe/stripe-react-native';
export default function Bottomsheet(props) {
	//console.log(props);
	const dispatch = useDispatch();
	const Stack = createNativeStackNavigator();
	const OrderInfo = ({navigation}) => {};
	const StoreHome = ({navigation}) => {
		const [popupDetails, setPopupDetails] = useState(null);
		const [isModalVisible, setIsModalVisible] = useState(false);
		const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
		const [refreshing, setRefreshing] = useState(false);
		const [restaurantName, setRestaurantName] = useState(props.info.restaurant_manager.resturantName);
		const [modalProductQuantity, setModalProductQuantity] = useState(1);
		const [cardDetails, setCardDetails] = useState();
		const {confirmPayment, loading} = useConfirmPayment();
		const [totalCost, setTotalCost] = useState(0);
		const {initPaymentSheet,presentPaymentSheet}=useStripe();
		useEffect(() => {
			Axios.post(API_ENDPOINTS.FETCH_RESTAURANT_PRODUCTS, {
				restaurantId: props.info.userId,
			}).then((response) => {
				dispatch(ALL_ACTIONS.setFetchedProducts(response.data));
				//console.log(response.data)
			});
		}, []);
		const products = useSelector((state) => state.restaurantReducer.products);
		const modalDetails = useSelector((state) => state.restaurantReducer.modalDetails);
		console.log(useSelector((state) => state.userReducer.userid));
		const onRefresh = React.useCallback(() => {
			setRefreshing(true);
			setTimeout(() => {
				Axios.post(API_ENDPOINTS.FETCH_RESTAURANT_PRODUCTS, {
					restaurantId: props.info.userId,
				}).then((response) => {
					dispatch(ALL_ACTIONS.setFetchedProducts(response.data));
					//console.log(response.data)
				});
				setRefreshing(false);
			}, 2000);
		}, []);
		const handleModal = (data) => {
			Axios.post('/api/fetchproduct', {
				id: data.productId,
				restaurantId: data.sell_products[0].manufactureId,
			}).then(async (response) => {
				dispatch(ALL_ACTIONS.setModalDetails(response.data[0]));
			});
			//(data);
			
			setIsModalVisible(true);
		};
		const closeModal = () => {
			dispatch(ALL_ACTIONS.setModalDetails({}));
			setIsModalVisible(false);
		};
		const updateDb = async () => {
			await Axios.post('/api/updatedb', {
				amount: 1,
				quantity: 1,
				id: 1,
			}).then((result) => {
				//console.log(result.data);
			});
		};
		const makePayment = (amount) => {
			Axios.post('/api/intents', {
				amount: amount * 100,
			}).then(async (response) => {
				if(response.data=='error'){
					return
				}else{
					console.log(modalDetails);
					const initResponse = await initPaymentSheet({
						merchantDisplayName: 'Avishka',
						paymentIntentClientSecret: response.data.paymentIntent,
					});
					if(initResponse.error){
						return
					}else{
						const paymentResponse = await presentPaymentSheet();
						if(paymentResponse.error){
							//console.log( paymentResponse.error.message)
							return
						}else{
							await Axios.post('/api/updatedb', {
								restaurantId: modalDetails.sell_products[0].manufactureId,
								quantity: modalProductQuantity,
								id: modalDetails.productId,
								lang: useSelector((state) => state.userReducer.userLocation.lang),
								long: useSelector((state) => state.userReducer.userLocation.lang),
							}).then((result) => {
								//console.log(result.data);
							});
							setIsModalVisible(!isModalVisible);
							
						}
						
					}
					
				}
				
			});
			
		};
		
		// const handlePayment = async () => {};
		//console.log(modalDetails);
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
				<View style={styles.StoreBottomSheetContainer}>{products.length > 0 ? <FlashList data={products} renderItem={({item}) => <Card openModal={handleModal} type='food' data={item} />} estimatedItemSize={products.length} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} /> : <Text>Loading..</Text>}</View>
				{Object.keys(modalDetails).length > 0 ? (
					<Modal
						dismissable={false}
						visible={isModalVisible}
						// onDismiss={handleModal}
						contentContainerStyle={{
							backgroundColor: 'white',
							width: '90%',
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'center',
							borderRadius: 10,
							height: '70%',
						}}
					>
						<View style={{height: '100%', width: '100%'}}>
							<View style={{width: '100%', height: '11%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
								<Text style={{left: 12, flexShrink: 1, fontFamily: 'Poppins-semibold'}}>{modalDetails.productName}</Text>
								<TouchableWithoutFeedback onPress={closeModal} style={{padding: 5}}>
									<View style={{borderRadius: 40, width: 40, height: 40, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
										<Icons.EvilIcons name='close' size={30} color={'white'} />
									</View>
								</TouchableWithoutFeedback>
							</View>
							<View style={{width: '100%', height: '43%', flexDirection: 'row'}}>
								<View style={{width: '50%', height: '100%', backgroundColor: '#7EB693', marginLeft: 10, borderRadius: 10, alignItems: 'center'}}>
									<Image
										style={{
											height: '75%',
											width: '90%',
											opacity: 0.9,
											borderRadius: 10,
											marginTop: '5%',
										}}
										source={{uri: NGROK_URL + PRODUCT_IMG_PATH + modalDetails.productImage}}
									/>
									<Chip style={{height: '20%', position: 'absolute', top: '8%', left: '54%'}}>
										<Text style={{fontSize: 10, fontFamily: 'Poppins-semibold'}}>Vegan</Text>
									</Chip>
									<View style={{height: '10%', alignItems: 'center', marginTop: '2%'}}>
										<Text style={{fontFamily: 'Poppins-semibold', fontSize: 18, color: '#000'}}>Rs.{modalDetails.sell_products[0].price.toFixed(2)}</Text>
									</View>
								</View>

								<View style={{width: '47%', height: '100%', left: '3%', justifyContent: 'space-around'}}>
									<View>
										<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>From :</Text>
										<Text style={{fontFamily: 'Poppins-regular', fontSize: 14}}>{restaurantName}</Text>
									</View>
									<View>
										<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>In Stock :</Text>
										<Text style={{fontFamily: 'Poppins-regular', fontSize: 14}}>{modalDetails.sell_products[0].quantity}</Text>
									</View>
									<View>
										<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>Cooking Time :</Text>
										<Text style={{fontFamily: 'Poppins-regular', fontSize: 14}}>{parseInt(modalDetails.cooking_time.split(':')[0]) * 60 + parseInt(modalDetails.cooking_time.split(':')[1])} minutes</Text>
									</View>
								</View>
							</View>
							<View style={{width: '100%', height: '15%', top: '2%', left: '3%'}}>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>Ingredients :</Text>
								<Text style={{fontFamily: 'Poppins-regular', fontSize: 14}}>This is ingredients</Text>
							</View>
							<View style={{height: '31%', width: '100%', left: '3%', flexDirection: 'row'}}>
								<View style={{height: '100%', width: '50%', justifyContent: 'space-around'}}>
									<CounterInput
										horizontal={true}
										onChange={(counter) => {
											setModalProductQuantity(counter);
											setTotalCost((modalProductQuantity * parseInt(modalDetails.sell_products[0].price)).toFixed(2));
										}}
										initial={1}
										reverseCounterButtons={true}
										min={1}
										max={parseInt(modalDetails.sell_products[0].quantity)}
										increaseButtonBackgroundColor='#7EB693'
										decreaseButtonBackgroundColor='#7EB693'
									/>
									<View style={{flexDirection: 'row', left: '3%'}}>
										<Text style={{fontFamily: 'Poppins-semibold', fontSize: 18, color: '#000'}}>Total : </Text>
										<Text style={{fontFamily: 'Poppins-semibold', fontSize: 18, color: '#7EB693'}}>Rs.{(modalProductQuantity * parseInt(modalDetails.sell_products[0].price)).toFixed(2)}</Text>
									</View>
								</View>
								<View style={{height: '100%', width: '50%', justifyContent: 'space-evenly', left: '8%'}}>
									<TouchableWithoutFeedback style={{width: '70%', height: '60%', borderRadius: 10}} onPress={() => makePayment((modalProductQuantity * parseInt(modalDetails.sell_products[0].price)).toFixed(2))}>
										<View style={{width: '100%', height: '100%', backgroundColor: '#7EB693', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
											<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#fff'}}>Buy now</Text>
										</View>
									</TouchableWithoutFeedback>
									<TouchableWithoutFeedback style={{width: '70%', height: '60%'}}>
										<View style={{width: '100%', height: '100%', backgroundColor: '#7EB693', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
											<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#fff'}}>Add to Cart</Text>
										</View>
									</TouchableWithoutFeedback>
								</View>
							</View>
						</View>
					</Modal>
				) : (
					<View></View>
				)}
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
		width: '100%',
		backgroundColor: '#F5F5F5',
	},
	StoreBottomSheetRow1: {
		flex: 1 / 3,
		height: Dimensions.get('screen').height / 3,
		marginBottom: '1%',
	},
	StoreBottomSheetContainer: {
		flex: 2 / 3,
		height: (Dimensions.get('screen').height / 3) * 2,
		width: '100%',
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
