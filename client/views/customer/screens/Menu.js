import {View, Text, StyleSheet, Button, Switch, Dimensions} from 'react-native';
import React, {useRef, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUserAction} from '../../../actions/UserAction';
import Card from '../../../components/Card';
import {Divider} from 'react-native-paper';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import {ProfileBottomSheet} from '../../../components/Bottomsheet';
import Backdrop from '../../../components/Backdrop';
export default function Menu() {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
	const dispatch = useDispatch();
	const styles = StyleSheet.create({
		container: {
			flex: 1,

			backgroundColor: 'white',
		},
	});
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ['98%'], []);
	const openModal = (data) => {
		// Axios.post(API_ENDPOINTS.FETCH_ALL_PRODUCTS).then((result) => {
		// 	const newFoods = result.data.filter((item) => filterArrayByCategory(item, data));
		// 	setOption('all');
		// 	setFoods(newFoods);
		// 	setSheetFoods(newFoods);
		// 	//dispatch(ALL_ACTIONS.setAllProducts(result.data));
		// 	//allFoods = useSelector((state) => state.userReducer.allProducts);
		// });
		// setSheetTitle(data);
		bottomSheetModalRef.current.present();
	};
	const CloseModal = () => {
		bottomSheetModalRef.current.close();
	};
	return (
		<View style={styles.container}>
			<Card type='profile' openModal={openModal} />
			<Divider
				style={{
					width: '96%',
				}}
			/>
			<View
				style={{
					height: '8%',
					width: '100%',
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-between',
					left:'2%'
				}}
			>
				<Text
					style={{
						fontFamily: 'Poppins-medium',
					}}
				>
					Enroll as event organizer
				</Text>
				<Switch
					value={isEnabled}
					onValueChange={toggleSwitch}
					style={{
						right: '2%',
					}}
				/>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					width: '100%',
				}}
			>
				<View
					style={{
						width: Dimensions.get('screen').width / 4,
						height: Dimensions.get('screen').width / 4,
						backgroundColor: 'red',
					}}
				></View>
				<View
					style={{
						width: Dimensions.get('screen').width / 4,
						height: Dimensions.get('screen').width / 4,
						backgroundColor: 'red',
					}}
				></View>
				<View
					style={{
						width: Dimensions.get('screen').width / 4,
						height: Dimensions.get('screen').width / 4,
						backgroundColor: 'red',
					}}
				></View>
			</View>
			<Button
				title='Log out'
				onPress={() => {
					dispatch(setUserAction(''));
				}}
			></Button>
			<Portal>
				<BottomSheetModal backgroundComponent={null} backdropComponent={Backdrop} ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
					<ProfileBottomSheet />
				</BottomSheetModal>
				{/* <Modal swipeDirection={'down'} isVisible={isModalVisible}>
					<View style={{flex: 1}}>
						<Text>Hello!</Text>

						<Button title='Hide modal' onPress={toggleModal} />
					</View>
				</Modal> */}
			</Portal>
			<PortalHost name='category_main' />
		</View>
	);
}
