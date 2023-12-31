import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, RefreshControl, Platform, Animated} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {COMMUNITY_IMG_PATH, NGROK_URL, POST_IMG_PATH, PRODUCT_IMG_PATH, RESTAURANT_IMG_PATH} from '../constants/Constants';
import {AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial} from '@expo/vector-icons';
import {BaseButton, ScrollView, TouchableWithoutFeedback} from 'react-native-gesture-handler';
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
import {Modal, PaperProvider, MD3Colors, TextInput} from 'react-native-paper';
import {Portal, PortalHost} from '@gorhom/portal';
import {Chip} from 'react-native-paper';
import CounterInput from 'react-native-counter-input';
import {CardField, confirmPayment, useConfirmPayment, useStripe} from '@stripe/stripe-react-native';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API} from '../keys/Keys';
import {IconButton, Button} from './Button';
import {BlurView} from 'expo-blur';
import ItemModal from '../components/ItemModal';
import * as ImagePicker from 'expo-image-picker';
import TextInputField from './TextInputField';
import RoundedButton from './RoundedButton';
import * as FileSystem from 'expo-file-system';
import {RadioButton} from 'react-native-paper';
import {updateprofile} from '../constants/Localizations';
import {I18n} from 'i18n-js';
import * as Icons from '../constants/Icons';
import Backdrop from './Backdrop';
import {AnimatedFAB} from 'react-native-paper';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import CreatePostModal from './CreatePostModal';
import * as Device from 'expo-device'
import { categoryBottomSheetLocale } from '../constants/Localizations';
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
		const {initPaymentSheet, presentPaymentSheet} = useStripe();
		const langitude = useSelector((state) => state.userReducer.userLocation.lang);
		const longitude = useSelector((state) => state.userReducer.userLocation.lang);
		const userID = useSelector((state) => state.userReducer.userid);
		//console.log('TYPE - > ' + typeof props.info.restaurant_manager.latitude);
		// Axios.post('https://app.notify.lk/api/v1/send',null,{params:{
		// 	user_id:'dilanka',
		// 	api_key:'Kxbdsfiwfjdf_fh438fsd',
		// 	sender_id:'NotifyDEMO',
		// 	to:'0714758322',
		// 	message:'This is your OTP 583925'
		// }});

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
		console.log(products);
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
		//console.log(modalDetails);
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
				//console.log(response);
				if (response.data == 'error') {
					return;
				} else {
					//console.log(modalDetails);
					const initResponse = await initPaymentSheet({
						merchantDisplayName: 'Avishka',
						paymentIntentClientSecret: response.data.paymentIntent,
					});
					if (initResponse.error) {
						return;
					} else {
						const paymentResponse = await presentPaymentSheet();
						if (paymentResponse.error) {
							////( paymentResponse.error.message)
							return;
						} else {
							await Axios.post('/api/updatedb', {
								restaurantId: modalDetails.sell_products[0].manufactureId,
								quantity: modalProductQuantity,
								id: modalDetails.productId,
								lang: langitude,
								long: longitude,
								userId: userID,
								amount: amount,
								date: new Date().toLocaleDateString(),
								time: new Date().toLocaleTimeString(),
								status: 'Delivery,',
							}).then((result) => {
								////(result.data);
							});
							setIsModalVisible(!isModalVisible);
						}
					}
				}
			});
		};
		if (props.type == 'store') {
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
								<View style={{height: '100%'}}>
									<Text style={{color: 'white', fontSize: 24}}>{props.info.restaurant_manager.resturantName}</Text>
								</View>
								{/* <View style={{top: -10, flexDirection: 'row', alignItems: 'center'}}>
									<AntDesign name='star' size={16} color={'white'} />
									<Text style={{color: 'white', fontSize: 16, left: 4}}>{props.info.rating}</Text>
								</View> */}
							</View>
						</LinearGradient>
						{/* <IconButton icon='camera' iconColor={MD3Colors.error50} size={20} onPress={() => //('Pressed')} /> */}
						<BaseButton style={{position: 'absolute', left: '88%', top: '3%'}} onPress={props.closeFun}>
							<View style={styles.CloseButton}>
								<EvilIcons name='close' size={30} color={'black'} />
							</View>
						</BaseButton>
						<BaseButton style={{position: 'absolute', left: '88%', top: '30%'}} onPress={() => navigation.navigate('StoreLocation')}>
							<View style={styles.CloseButton}>
								<EvilIcons name='location' size={30} color={'black'} />
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
								height: '80%',
							}}
						>
							<View style={{height: '100%', width: '100%'}}>
								<View style={{width: '100%', height: '11%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
									<Text style={{left: 12, flexShrink: 1, fontFamily: 'Poppins-semibold'}}>{modalDetails.productName}</Text>
									<TouchableWithoutFeedback onPress={closeModal} style={{padding: 5}}>
										<View style={{borderRadius: 40, width: 40, height: 40, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
											<EvilIcons name='close' size={30} color={'white'} />
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
								<View style={{width: '100%', height: '17%', left: '3%'}}>
									<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>Ingredients :</Text>
									<ScrollView style={{width: '90%', height: '90%'}}>
										<Text style={{fontFamily: 'Poppins-regular', fontSize: 14, flexWrap: 'wrap'}}>{modalDetails.ingredient}</Text>
									</ScrollView>
								</View>
								<View style={{height: '31%', width: '100%', left: '3%', flexDirection: 'row', top: '2%'}}>
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
										{modalDetails.sell_products[0].quantity>0?<TouchableWithoutFeedback style={{width: '70%', height: '60%', borderRadius: 10}} onPress={() => makePayment((modalProductQuantity * parseInt(modalDetails.sell_products[0].price)).toFixed(2))}>
											<View style={{width: '100%', height: '100%', backgroundColor: '#7EB693', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
												<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#fff'}}>Buy now</Text>
											</View>
										</TouchableWithoutFeedback>:<></>}
										
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
		} else if (props.type == 'category_product') {
			return <View style={styles.container}></View>;
		}
		// const handlePayment = async () => {};
		//console.log(modalDetails);
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
					<MapViewDirections
						origin={{
							latitude: props.info.restaurant_manager.latitude,
							longitude: props.info.restaurant_manager.longitude,
						}}
						destination={{
							latitude: 6.90531,
							longitude: 79.862316,
						}}
						apikey={GOOGLE_API} // insert your API Key here
						strokeWidth={4}
						strokeColor='#111111'
					/>
					<Marker
						coordinate={{
							latitude: props.info.restaurant_manager.latitude,
							longitude: props.info.restaurant_manager.longitude,
						}}
					/>
					<Marker
						coordinate={{
							latitude: 6.90531,
							longitude: 79.862316,
						}}
					/>
				</MapView>
				<BaseButton style={{position: 'absolute', top: '2%', left: '3%'}} onPress={() => navigation.navigate('StoreHome')}>
					<View style={[styles.CloseButton, {backgroundColor: 'black'}]}>
						<Ionicons name='chevron-back' size={30} color={'white'} />
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
export function CategoryBottomSheet(props) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [cardDetails, setCardDetails] = useState();
	const {confirmPayment, loading} = useConfirmPayment();
	const [totalCost, setTotalCost] = useState(0);
	const data = props.data;
	const dispatch = useDispatch();
	const locale = useSelector((state) => state.userReducer.userLanguage);
	// useEffect(() => {
	// 	Axios.post(API_ENDPOINTS.FETCH_ALL_PRODUCTS).then((result) => {
	// 		dispatch(ALL_ACTIONS.setAllProducts(result.data));
	// 	});
	// }, []);

	const changeOption = () => {
		setOption(options[(options.indexOf(option) + 1) % 4]);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};
	const openModal = (data) => {
		console.log('asdhsds');
		Axios.post(API_ENDPOINTS.FETCH_PRODUCT, {
			id: data.productId,
			restaurantId: data.sell_products[0].manufactureId,
		}).then(async (response) => {
			Axios.post(API_ENDPOINTS.FETCH_RESTAURANT, {
				id: response.data[0].sell_products[0].manufactureId,
			}).then((response_2) => {
				console.log(response.data);
				let product = response.data[0];
				let restaurant = response_2.data[0];
				let modalData = {
					...product,
					...restaurant,
				};
				dispatch(ALL_ACTIONS.setModalDetails(modalData));
				setIsModalVisible(true);
			});
		});
	};
	const closeModal = () => {
		setIsModalVisible(false);
	};
	const i18n = new I18n(categoryBottomSheetLocale);
	i18n.enableFallback = true;
	i18n.locale = locale;
	return (
		<View style={styles.container}>
			{isModalVisible && (
				<Portal>
					<ItemModal isModalVisible={isModalVisible} closeModal={closeModal} />
				</Portal>
			)}
			<View style={{height: '100%', width: '100%'}}>
				{data.length > 0 ? (
					<FlashList contentContainerStyle={{paddingTop: Dimensions.get('screen').height / 5}} data={data} renderItem={({item}) => <Card openModal={openModal} type='food' data={item} />} estimatedItemSize={data.length} />
				) : (
					<View
						style={{
							width: '100%',
							height: '80%',
							alignItems: 'center',
							justifyContent: 'center',
							paddingTop: Dimensions.get('screen').height / 7,
						}}
					>
						<Image
							style={{
								height: '50%',
								width: '98%',
								opacity: 0.5,
							}}
							contentFit='cover'
							resizeMode='contain'
							source={require('../assets/no-results.png')}
						/>
						<Text
							style={{
								fontFamily: 'Poppins-semibold',
								fontSize: 20,
								paddingTop: 20,
							}}
						>
							{i18n.t('noproducts')}
						</Text>
					</View>
				)}
			</View>
			<BlurView
				intensity={70}
				style={{
					height: props.data.length > 0 ? Dimensions.get('screen').height / 5 : Dimensions.get('screen').height / 7,
					width: '100%',
					textAlign: 'center',
					justifyContent: 'center',
					overflow: 'hidden',
					position: 'absolute',
				}}
			>
				<View
					style={{
						height: '50%',
						justifyContent: 'center',
					}}
				>
					<Text style={{fontFamily: 'Gabarito-Bold', fontSize: 37, paddingLeft: Dimensions.get('screen').width / 45}}>{i18n.t(`${props.title.toLowerCase()}`)}</Text>
				</View>
				{props.data.length > 0 ? (
					<View
						style={{
							height: '50%',
							width: '100%',
						}}
					>
						{props.type == 'delivery' ? (
							<IconButton
								name={MaterialIcons}
								padding={true}
								iconProps={{
									name: 'delivery-dining',
									size: 24,
									color: 'black',
									radius: 30,
								}}
								title='Delivery'
								func={props.optionChangeFun}
							/>
						) : props.type == 'all' ? (
							<IconButton name={MaterialIcons} padding={true} title='All' func={props.optionChangeFun} />
						) : props.type == 'dine in' ? (
							<IconButton
								name={MaterialCommunityIcons}
								padding={true}
								iconProps={{
									name: 'silverware-fork-knife',
									size: 24,
									color: 'black',
									radius: 30,
								}}
								title='Dine in'
								func={props.optionChangeFun}
							/>
						) : (
							<IconButton
								name={Ionicons}
								padding={true}
								iconProps={{
									name: 'fast-food-outline',
									size: 24,
									color: 'black',
									radius: 30,
								}}
								title='Take away'
								func={props.optionChangeFun}
							/>
						)}
					</View>
				) : (
					<></>
				)}
			</BlurView>
		</View>
	);
}
export function ProfileBottomSheet(props) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [cardDetails, setCardDetails] = useState();
	const {confirmPayment, loading} = useConfirmPayment();
	const [totalCost, setTotalCost] = useState(0);
	const [image, setImage] = useState(null);
	const [res, setRes] = useState(null);
	const data = props.data;
	const dispatch = useDispatch();
	const locale = useSelector((state) => state.userReducer.userLanguage);
	// useEffect(() => {
	// 	Axios.post(API_ENDPOINTS.FETCH_ALL_PRODUCTS).then((result) => {
	// 		dispatch(ALL_ACTIONS.setAllProducts(result.data));
	// 	});
	// }, []);
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			base64: true,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0]);
			setRes(result.assets[0].base64);
		}
	};
	const changeOption = () => {
		setOption(options[(options.indexOf(option) + 1) % 4]);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};
	const openModal = (data) => {
		console.log('asdhsds');
		Axios.post('/api/fetchproduct', {
			id: data.productId,
			restaurantId: data.sell_products[0].manufactureId,
		}).then(async (response) => {
			Axios.post('/api/fetchRestaurant', {
				id: response.data[0].sell_products[0].manufactureId,
			}).then((response_2) => {
				console.log(response.data);
				let product = response.data[0];
				let restaurant = response_2.data[0];
				let modalData = {
					...product,
					...restaurant,
				};
				dispatch(ALL_ACTIONS.setModalDetails(modalData));
				setIsModalVisible(true);
			});
		});
	};
	const closeModal = () => {
		setIsModalVisible(false);
	};
	const handleSubmit = () => {
		const data = new FormData();
		console.log(Date.now() + image.fileName);
		Axios.post('/api/registercommunity', {
			image: res,
			name: Date.now() + image.fileName,
			communityName: communityName,
			communityDescription: communityDescription,
			user_id: user_id,
		}).then((response) => {
			console.log(response.data);
		});

		//console.log(data);
	};
	const i18n = new I18n(updateprofile);
	i18n.enableFallback = true;
	i18n.locale = locale;
	return (
		<View style={styles.container}>
			<View
				style={{
					width: '100%',
					height: '12%',
					justifyContent: 'center',
					left: '3%',
				}}
			>
				<Text style={{fontFamily: 'Gabarito-Bold', fontSize: 26}}>{i18n.t('title')}</Text>
			</View>
			<View
				style={{
					width: '100%',
					height: '88%',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					style={{
						width: '94%',
						height: '25%',
						backgroundColor: '#dfdfdf',
						borderRadius:Device.brand=='Apple'? '7em':12,
					}}
					activeOpacity={0.7}
					onPress={pickImage}
				>
					<View
						style={{
							flex: 1,
						}}
					>
						{image ? (
							<Image source={{uri: image.uri}} style={{width: '100%', height: '100%', borderRadius: 12}} />
						) : (
							<View
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<MaterialIcons name='add-a-photo' size={45} color='#afafaf' />
								<Text style={{fontFamily: 'Poppins-medium', fontSize: 18, top: '5%', color: '#8f8f8f'}}>{i18n.t('chooseimage')}</Text>
							</View>
						)}
					</View>
				</TouchableOpacity>
				<TextInput style={{width: '94%', top: '2%'}} label={i18n.t('contactno')} placeholder='08249234' mode='outlined' />
				<TextInput style={{width: '94%', top: '2%'}} label={i18n.t('newpassword')} placeholder='08249234' mode='outlined' />
				<TextInput style={{width: '94%', top: '2%'}} label={i18n.t('confirmnewpassword')} placeholder='08249234' mode='outlined' />
				{/* <TextInputField isSecured={false} function={setCommunityName} value={communityName} textInput={{paddingLeft: '0%'}} placeholder='Community name' textInputRow={{top: '3%'}} />
				<TextInputField isSecured={false} function={setCommunityDescription} value={communityDescription} textInput={{paddingLeft: '0%'}} placeholder='Community description' textInputRow={{top: '6%'}} />
				<TextInputField isSecured={false} function={setCommunityDescription} value={communityDescription} textInput={{paddingLeft: '0%'}} placeholder='Community description' textInputRow={{top: '9%'}} /> */}
				<TouchableOpacity
					style={{
						top: '9%',
						width: '95%',
						height: '12%',
						borderRadius: Device.brand=='Apple'?'200em':12,
						backgroundColor: '#7EB693',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={handleSubmit}
					activeOpacity={0.7}
				>
					<Text style={{fontFamily: 'Poppins-medium', fontSize: 31, color: 'white'}}>{i18n.t('btntitle')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
export function CreateCommunityBottomSheet(props) {
	const [image, setImage] = useState(null);
	const [res, setRes] = useState(null);
	const [communityName, setCommunityName] = useState('');
	const [communityDescription, setCommunityDescription] = useState('');
	const [visibility, setVisibility] = useState(0);
	const user_id = useSelector((state) => state.userReducer.userid);
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			base64: true,
		});

		//console.log(result.assets[0]);

		if (!result.canceled) {
			setImage(result.assets[0]);
			setRes(result.assets[0].base64);
		}
	};
	const handleSubmit = () => {
		const data = new FormData();
		//console.log(Date.now() + image.fileName);
		Axios.post(API_ENDPOINTS.REGISTER_COMMUNITY, {
			image: res,
			name: Date.now() + image.fileName,
			communityName: communityName,
			communityDescription: communityDescription,
			visibility: visibility,
			user_id: user_id,
		}).then((response) => {
			props.CloseModal('community');
		});

		//console.log(data);
	};
	//console.log(image[0].uri);
	return (
		<View style={styles.container}>
			<View
				style={{
					width: '100%',
					height: '12%',
					justifyContent: 'center',
					left: '3%',
				}}
			>
				<Text style={{fontFamily: 'Gabarito-Bold', fontSize: 37}}>Create a Community</Text>
			</View>
			<View
				style={{
					width: '100%',
					height: '88%',
					alignItems: 'center',
				}}
			>
				<TouchableOpacity
					style={{
						width: '94%',
						height: '25%',
						backgroundColor: '#dfdfdf',
						borderRadius:Device.brand=='Apple'? '7em':4,
					}}
					activeOpacity={0.7}
					onPress={pickImage}
				>
					<View
						style={{
							flex: 1,
						}}
					>
						{image ? (
							<Image source={{uri: image.uri}} style={{width: '100%', height: '100%', borderRadius: 12}} />
						) : (
							<View
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<MaterialIcons name='add-a-photo' size={45} color='#afafaf' />
								<Text style={{fontFamily: 'Poppins-medium', fontSize: 18, top: '5%', color: '#8f8f8f'}}>Choose an image</Text>
							</View>
						)}
					</View>
				</TouchableOpacity>
				<TextInputField isSecured={false} function={setCommunityName} value={communityName} textInput={{paddingLeft: '0%'}} placeholder='Community name' textInputRow={{top: '3%'}} />
				<TextInputField isSecured={false} function={setCommunityDescription} value={communityDescription} textInput={{paddingLeft: '0%'}} placeholder='Community description' textInputRow={{top: '6%'}} />
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						justifyContent: 'center',
						top: '9%',
					}}
				>
					<RadioButton value='first' status={visibility === 0 ? 'checked' : 'unchecked'} onPress={() => setVisibility(0)} />
					<Text style={{marginRight: '4%', fontFamily: 'Poppins-medium'}}>Public</Text>
					<RadioButton value='second' status={visibility === 1 ? 'checked' : 'unchecked'} onPress={() => setVisibility(1)} />
					<Text style={{marginRight: '4%', fontFamily: 'Poppins-medium'}}>Private</Text>
				</View>
				<TouchableOpacity
					style={{
						top: '9%',
						width: '95%',
						height: '12%',
						borderRadius:Device.brand=='Apple'?  '200em':60,
						backgroundColor: '#7EB693',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={handleSubmit}
					activeOpacity={0.7}
				>
					<Text style={{fontFamily: 'Poppins-medium', fontSize: 31, color: 'white'}}>Create</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
export function CommunityHomeBottomSheet(props) {
	console.log(props);
	const [isMember, setIsMemeber] = useState(false);
	const [load, setLoad] = useState(true);
	const [image, setImage] = useState(null);
	const [res, setRes] = useState(null);
	const [communityName, setCommunityName] = useState('');
	const [communityDescription, setCommunityDescription] = useState('');
	const [visibility, setVisibility] = useState(0);
	const [userCount, setUserCount] = useState();
	const user_id = useSelector((state) => state.userReducer.userid);
	const userCommunities = useSelector((state) => state.userReducer.userCommunities);
	const [isExtended, setIsExtended] = useState(true);
	const bottomSheetModalRef = useRef(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [posts, setPosts] = useState();
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			base64: true,
		});

		//console.log(result.assets[0]);

		if (!result.canceled) {
			setImage(result.assets[0]);
			setRes(result.assets[0].base64);
		}
	};
	const handleSubmit = (id, type) => {
		setIsMemeber(!isMember);
		//console.log(id);
		const tempArray = userCommunities.map((innerArray) => innerArray);
		// tempArray.push(id);
		// console.log(tempArray);
		// if (type == 'heart-border') {
		// 	if (tempArray.indexOf(id) == -1) {
		// 		tempArray.push(id);
		// 		dispatch(ALL_ACTIONS.setFavRestaurants(tempArray));
		// 	}
		// 	Axios.post(API_ENDPOINTS.ADD_FAV_STORE, {
		// 		user_id: user_id,
		// 		data: tempArray,
		// 	}).then((response) => {
		// 		console.log(response);
		// 	});
		// } else {
		// 	if (!(tempArray.indexOf(id) == -1)) {
		// 		const newArr = tempArray.filter((item) => item != id);
		// 		Axios.post(API_ENDPOINTS.ADD_FAV_STORE, {
		// 			user_id: user_id,
		// 			data: newArr,
		// 		}).then((response) => {
		// 			console.log(response);
		// 		});
		// 		dispatch(ALL_ACTIONS.setFavRestaurants(newArr));
		// 		console.log(newArr);
		// 	}
		// }
		// Axios.post(API_ENDPOINTS.JOIN_COMMUNITY, {
		// 	userId: user_id,
		// }).then((response) => {
		// 	console.log(response);
		// });

		//console.log(data);
	};
	const communities = [
		{
			id: 1,
			type: 'Public community',
			name: 'Barista',
			location: 'Reid Aveue',
			members: 4.5,
		},
		{
			id: 2,
			type: 'Public community',
			name: 'Pizza hut',
			location: 'Havlock',
			members: 1.2,
		},
		{
			id: 3,
			type: 'Public community',
			name: 'Sri Vihar',
			location: 'Thunmulla',
			members: 1.6,
		},
		{
			id: 4,
			type: 'Public community',
			name: 'Nelum kole',
			location: 'Thimbirigasyaya',
			members: 3.3,
		},
		{
			id: 5,
			type: 'Public community',
			name: 'Savinra',
			location: 'Nugegoda',
			members: 2.5,
		},
		{
			id: 6,
			type: 'Public community',
			name: 'McDonalds',
			location: 'Reid Avenue',
			members: 7.5,
		},
		{
			id: 7,
			type: 'Public community',
			name: 'Mayumi Home Foods',
			location: 'Nawala',
			members: 1.7,
		},
		{
			id: 8,
			type: 'Public community',
			name: 'KFC',
			location: 'Nugegoda',
			members: 5.2,
		},
		{
			id: 9,
			type: 'Public community',
			name: 'Elite',
			location: 'Bambalapitiya',
			members: 1.4,
		},
		{
			id: 10,
			type: 'Public community',
			name: 'Elina Foods',
			location: 'Kirulapone',
			members: 2.8,
		},
		{
			id: 11,
			type: 'Public community',
			name: 'Saveira',
			location: 'Kohuwala',
			members: 2.9,
		},
		{
			id: 12,
			type: 'Public community',
			name: 'Go Green',
			location: 'Townhall',
			members: 1.7,
		},
	];
	const onScroll = ({nativeEvent}) => {
		const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

		setIsExtended(currentScrollPosition <= 0);
	};
	const fabStyle = {['right']: 16};
	useEffect(() => {
		Axios.post(API_ENDPOINTS.GET_COMMUNITY_DETAILS, {
			communityId: props.data.communityId,
		}).then((response) => {
			//console.log(response.data);
			setUserCount(response.data.count);
		});
		Axios.get('/api/getFeed', {
			params: {
				communityId: props.data.communityId,
			},
		}).then((response) => {
			setPosts(response.data);
			console.log(posts);
		});
	}, []);
	const openModal = (data) => {
		setIsModalVisible(!isModalVisible);
		//console.log(isModalVisible);
		//bottomSheetModalRef.current.present();
	};
	const closeModal = () => {
		setIsModalVisible(!isModalVisible);
	};
	const snapPoints = useMemo(() => ['96%'], []);
	return (
		<View style={styles.container}>
			{isModalVisible && (
				<Portal>
					<CreatePostModal isVisible={isModalVisible} closeFun={closeModal} id={props.data.communityId} />
				</Portal>
			)}
			<View style={{height: '30%'}}>
				{load && (
					<Image
						style={{
							height: '100%',
							width: '100%',
							opacity: 0.4,
						}}
						source={require('../assets/vf-bg-gray.png')}
						contentFit='cover'
					/>
				)}
				<Image
					style={{
						height: '100%',
						width: '100%',
						opacity: 0.9,
					}}
					source={{uri: NGROK_URL + COMMUNITY_IMG_PATH + props.data.image}}
					onLoadEnd={() => setLoad(false)}
				/>

				<LinearGradient style={styles.gradient} colors={['transparent', 'rgba(0,0,0,0.8)']}></LinearGradient>

				{/* <BaseButton style={{position: 'absolute', left: '88%', top: '3%'}} onPress={props.closeFun}>
					<View style={styles.CloseButton}>
						<EvilIcons name='close' size={30} color={'black'} />
					</View>
				</BaseButton>
				<BaseButton style={{position: 'absolute', left: '88%', top: '30%'}} onPress={() => navigation.navigate('StoreLocation')}>
					<View style={styles.CloseButton}>
						<EvilIcons name='location' size={30} color={'black'} />
					</View>
				</BaseButton> */}
			</View>
			{isMember ? (
				<>
					<View style={{height: '12%', flexDirection: 'row'}}>
						<View style={{width: '70%', height: '100%'}}>
							<Text style={{fontFamily: 'Poppins-semibold', fontSize: 28, left: '2%'}}>{props.data.name}</Text>
							<View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginLeft: '2%'}}>
								<Text style={{fontFamily: 'Poppins-medium', fontSize: 14, color: '#4D4C44'}}>{props.data.visibility == 0 ? 'Public community' : 'Private community'}</Text>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14}}>.</Text>
								<Text style={{fontFamily: 'Poppins-medium'}}> {userCount == 1 ? userCount + ' member' : userCount > 999 ? (userCount * 1.0) / 1000 + 'K members' : userCount + ' members'}</Text>
							</View>
						</View>

						<View style={{width: '30%', height: '80%', alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity activeOpacity={0.3} onPress={() => handleSubmit(props.data.communityId, 'leave')}>
								<View style={{height: '70%', width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginRight: '10%'}}>
									<View style={[{width: '77%', height: '100%', backgroundColor: 'white', borderRadius: 400, justifyContent: 'center', fontFamily: 'Yellowtail-Regular', borderWidth:Device.brand=='Apple'? '2px':2, alignItems: 'center'}]}>
										<Text style={{fontFamily: 'Poppins-semibold'}}>Leave</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{width: '100%', height: '58%', backgroundColor: 'dodger'}}>
						{isMember && posts && (
							<FlashList
								onScroll={onScroll}
								data={posts}
								renderItem={({item}) => (
									<View style={{width: '100%', height: Dimensions.get('screen').height / 4, marginBottom: '2%', justifyContent: 'center', alignItems: 'center'} }key={Math.random()}>
										<View style={{width: '97%', borderColor: 'black', borderWidth: 3, borderRadius: 8}}>
											<View
												style={{
													height: '20%',
													width: '100%',
												}}
											>
												<Text style={{fontFamily: 'Poppins-semibold', fontSize: 18, top: '5%', color: '#000'}}>{item.title}</Text>
											</View>
											<View
												style={{
													height: '50%',
													width: '100%',
												}}
											>
												<Text>{item.description}</Text>
											</View>
											<View
												style={{
													height: '30%',
													width: '100%',
													flexDirection: 'row',
													alignItems:'center',
													justifyContent:'center'
												}}
											>
												{item.images.map((image, index) => (
													
														<Image key={Math.random()}
															style={{
																height: 40,
																width: 40,
																borderTopLeftRadius: 15,
																borderTopRightRadius: 15,
															}}
															source={{uri: NGROK_URL + POST_IMG_PATH + image.images}}
															// onLoad={() => setLoad(false)}
														/>
													
												))}
											</View>
										</View>
									</View>
								)}
								estimatedItemSize={communities.length}
								contentContainerStyle={{
									paddingTop: 10,
								}}
							/>
						)}
						<AnimatedFAB
							icon={'plus'}
							label={'Create'}
							extended={isExtended}
							onPress={openModal}
							visible={true}
							animateFrom={'right'}
							iconMode={'dynamic'}
							color={'white'}
							style={[
								{
									position: 'absolute',
									backgroundColor: '#76B693',
									right: 0,
									bottom: 13,
								},
								fabStyle,
							]}
						/>
					</View>

					{/* <Modal swipeDirection={'down'} isVisible={isModalVisible}>
					<View style={{flex: 1}}>
						<Text>Hello!</Text>

						<Button title='Hide modal' onPress={toggleModal} />
					</View>
				</Modal> */}
				</>
			) : (
				<>
					<View style={{height: '12%', flexDirection: 'row'}}>
						<View style={{width: '70%', height: '100%'}}>
							<Text style={{fontFamily: 'Poppins-semibold', fontSize: 28, left: '2%'}}>{props.data.name}</Text>
							<View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginLeft: '2%'}}>
								<Text style={{fontFamily: 'Poppins-medium', fontSize: 14, color: '#4D4C44'}}>{props.data.visibility == 0 ? 'Public community' : 'Private community'}</Text>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14}}>.</Text>
								<Text style={{fontFamily: 'Poppins-medium'}}> {userCount == 1 ? userCount + ' member' : userCount > 999 ? (userCount * 1.0) / 1000 + 'K members' : userCount + ' members'}</Text>
							</View>
						</View>

						<View style={{width: '30%', height: '80%', alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity activeOpacity={0.3} onPress={() => handleSubmit(props.data.communityId, 'add')}>
								<View style={{height: '70%', width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginRight: '10%'}}>
									{/* <View style={{width: '33%', height: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 400, borderBottomLeftRadius: 400, borderColor: 'black', borderLeftWidth: '2px', borderTopWidth: '2px', borderBottomWidth: '2px'}}>
									<Icons.Ionicons name='exit-outline' size={23} color='black' />
								</View> */}
									<View style={[{width: '77%', height: '100%', backgroundColor: 'white', borderRadius: 400, justifyContent: 'center', fontFamily: 'Yellowtail-Regular', borderWidth: Device.brand=='Apple'? '2px':2, alignItems: 'center'}]}>
										<Text style={{fontFamily: 'Poppins-semibold'}}>Join</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center'}}>
						<Image
							style={{
								height: '60%',
								width: '60%',
								opacity: 0.4,
							}}
							source={require('../assets/private.png')}
							contentFit='cover'
						/>

						<Text style={{fontFamily: 'Poppins-semibold', color: '#4D4C44'}}>Please join to community</Text>
						<Text style={{fontFamily: 'Poppins-semibold', color: '#4D4C44'}}>in order to view its content</Text>
					</View>
				</>
			)}
		</View>
	);
}
export function CreatePostBottomSheet(props) {
	return (
		<View>
			<Text>Hello</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: '#FFF',
	},
	StoreBottomSheetRow1: {
		flex: 1 / 3,
		height: 400,
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
		// shadowColor: '#171717',
		// shadowOffset: {width: -2, height: 4},
		// shadowOpacity: 0.2,
		// shadowRadius: 3,
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
