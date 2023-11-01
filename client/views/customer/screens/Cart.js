import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef,useMemo} from 'react';
import {useSelector} from 'react-redux';
import Axios from '../../../api/Axios';
import {FlashList} from '@shopify/flash-list';
import Card from '../../../components/Card';
import {brand} from 'expo-device';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import Orders from './Orders';
import Backdrop from '../../../components/Backdrop';
export default function Cart() {
	const bottomSheetModalRef = useRef(null);
	const [isClick, setClick] = useState(false);
	const cart = useSelector((state) => state.userReducer.cart);
	const snapPoints = useMemo(() => ['96%'], []);
	const styles = StyleSheet.create({
		container: {
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
		},
	});
	const handleModal = () => {};
	useEffect(() => {
		Axios.post('/api/getallproducts').then((response) => {
			console.log(response.data);
		});
	});
	const openModal = (data) => {
		//setSheetCommunities(data);
		bottomSheetModalRef.current.present();
	};
	const CloseModal = () => {
		//console.log('sdsd')
		bottomSheetModalRef.current.close();
	};
	console.log(cart.length);
	return (
		<View style={{height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, backgroundColor: 'white'}}>
			<View style={{height: Dimensions.get('screen').height / 20, width: Dimensions.get('screen').width, backgroundColor: 'white'}}>
				<TouchableOpacity activeOpacity={0.3} onPress={openModal}>
					<View style={{height: '100%', width: '100%', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
						<View style={[{right: '14%', alignItems: 'center', width: '20%', height: '90%', backgroundColor: 'white', borderRadius: 400, justifyContent: 'center', fontFamily: 'Yellowtail-Regular', borderWidth: brand == 'Apple' ? '2px' : 2}]}>
							<Text style={{fontFamily: 'Poppins-semibold'}}>Orders</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			{cart && cart.length > 0 && <FlashList contentContainerStyle={{paddingBottom: 20}} data={cart} renderItem={({item}) => <Card openModal={handleModal} type='cartCard' data={item} />} estimatedItemSize={cart.length} />}
			<Portal>
				<BottomSheetModal backgroundComponent={null} backdropComponent={Backdrop} ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
					<Orders />
				</BottomSheetModal>
				{/* <Modal swipeDirection={'down'} isVisible={isModalVisible}>
					<View style={{flex: 1}}>
						<Text>Hello!</Text>

						<Button title='Hide modal' onPress={toggleModal} />
					</View>
				</Modal> */}
			</Portal>
			<PortalHost name='cart_main' />
		</View>
	);
}
