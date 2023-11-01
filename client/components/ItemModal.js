import {View, Text, TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Modal, Portal, PaperProvider, MD3Colors, Chip} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {NGROK_URL, PRODUCT_IMG_PATH, RESTAURANT_IMG_PATH} from '../constants/Constants';
import {AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial} from '@expo/vector-icons';
import CounterInput from 'react-native-counter-input';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Axios from '../api/Axios';
import {CardField, confirmPayment, useConfirmPayment, useStripe} from '@stripe/stripe-react-native';
import {setCart} from '../actions/UserAction';
export default function ItemModal(props) {
	console.log(props);
	const dispatch = useDispatch();
	const [modalProductQuantity, setModalProductQuantity] = useState(1);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [totalCost, setTotalCost] = useState(0);
	const modalDetails = useSelector((state) => state.restaurantReducer.modalDetails);
	const cart = useSelector((state) => state.userReducer.cart);
	const langitude = useSelector((state) => state.userReducer.userLocation.lang);
	const longitude = useSelector((state) => state.userReducer.userLocation.lang);
	const userID = useSelector((state) => state.userReducer.userid);
	const {initPaymentSheet, presentPaymentSheet} = useStripe();
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
	const addToCart = (id, qty) => {
		var newCart = [];
		//var filteredCommunities = {};
		async function updateCart() {
			try {
				if (cart) {
					newCart = cart.map((innerArray) => innerArray);
					const newItem = {id: id, qty: qty};
					newCart.push(newItem);
					dispatch(setCart(newCart));
					console.log(newCart);
					props.closeModal();
					//filteredCommunities = tempCommunities.filter((item) => userCommunities.indexOf(item.communityId) == -1);
					//console.log(tempCommunities);
				}
			} catch (error) {
				console.log('error');
			}
		}
		updateCart();
		console.log(id, qty);
	};
	return (
		<Modal
			dismissable={false}
			visible={props.isModalVisible}
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
					<TouchableWithoutFeedback onPress={props.closeModal}>
						<View style={{borderRadius: 40, width: 40, height: 40, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', right: '10%'}}>
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
						{/* <Chip style={{height: '20%', position: 'absolute', top: '8%', left: '54%'}}>
							<Text style={{fontSize: 10, fontFamily: 'Poppins-semibold'}}>Vegan</Text>
						</Chip> */}
						<View style={{height: '10%', alignItems: 'center', marginTop: '2%'}}>
							<Text style={{fontFamily: 'Poppins-semibold', fontSize: 18, color: '#000'}}>Rs.{modalDetails.sell_products[0].price.toFixed(2)}</Text>
						</View>
					</View>

					<View style={{width: '47%', height: '100%', left: '3%', justifyContent: 'space-around'}}>
						<View>
							<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>From :</Text>
							<Text style={{fontFamily: 'Poppins-regular', fontSize: 14}}>{modalDetails.resturantName}</Text>
						</View>
						<View>
							<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>In Stock :</Text>
							<Text style={{fontFamily: 'Poppins-regular', fontSize: 14}}>{modalDetails.sell_products[0].quantity}</Text>
						</View>
						{modalDetails.cooking_time && (
							<View>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>Cooking Time :</Text>
								<Text style={{fontFamily: 'Poppins-regular', fontSize: 14}}>{modalDetails.cooking_time && parseInt(modalDetails.cooking_time.split(':')[0]) * 60 + parseInt(modalDetails.cooking_time.split(':')[1])} minutes</Text>
							</View>
						)}
					</View>
				</View>
				<View style={{width: '100%', height: '17%', left: '3%'}}>
					<Text style={{fontFamily: 'Poppins-semibold', fontSize: 16}}>Ingredients :</Text>
					<ScrollView style={{width: '90%', height: '90%'}}>
						<Text style={{fontFamily: 'Poppins-regular', fontSize: 14, flexWrap: 'wrap'}}>{modalDetails.ingredient}</Text>
					</ScrollView>
				</View>
				<View style={{height: '29%', width: '100%', left: '3%', flexDirection: 'row', top: '2%'}}>
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
						<TouchableWithoutFeedback style={{width: '70%', height: '40%', borderRadius: 10}} onPress={() => makePayment((modalProductQuantity * parseInt(modalDetails.sell_products[0].price)).toFixed(2))}>
							<View style={{width: '80%', height: '40%', backgroundColor: '#7EB693', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#fff'}}>Buy now</Text>
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback style={{width: '70%', height: '40%'}} onPress={() => addToCart(modalDetails.productId, modalProductQuantity)}>
							<View style={{width: '80%', height: '40%', backgroundColor: '#7EB693', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#fff'}}>Add to Cart</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
		</Modal>
	);
}
// export function CreatePostModal(props) {
// 	<Modal
// 		dismissable={false}
// 		visible={props.isVisible}
// 		// onDismiss={handleModal}
// 		contentContainerStyle={{
// 			backgroundColor: 'red',
// 			width: '90%',
// 			justifyContent: 'center',
// 			alignItems: 'center',
// 			alignSelf: 'center',
// 			borderRadius: 10,
// 			height: '80%',
// 		}}
// 	>
// 		<View style={{height: 100, width: 100, backgroundColor: 'green'}}>
// 			<Text>Helloo</Text>
// 		</View>
// 	</Modal>;
// }
