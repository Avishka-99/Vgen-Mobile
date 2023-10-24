import {View, Text, StyleSheet, Button} from 'react-native';
import React,{useRef,useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUserAction} from '../../../actions/UserAction';
import Card from '../../../components/Card';
import {Divider} from 'react-native-paper';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import { ProfileBottomSheet } from '../../../components/Bottomsheet';
import Backdrop from '../../../components/Backdrop';
export default function Menu() {
	const dispatch = useDispatch();
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			backgroundColor:'white'
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
					width: '100%',
				}}
			/>
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
