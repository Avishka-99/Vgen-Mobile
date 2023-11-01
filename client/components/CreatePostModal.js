import {View, Text, TouchableWithoutFeedback, Image, ScrollView, TextInput,Keyboard} from 'react-native';
import React, {useState} from 'react';
import {Modal, Portal, PaperProvider, MD3Colors, Chip} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {NGROK_URL, PRODUCT_IMG_PATH, RESTAURANT_IMG_PATH} from '../constants/Constants';
import {AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial} from '@expo/vector-icons';
import TextInputField from './TextInputField';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Axios from '../api/Axios';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
//import Textarea from 'react-native-textarea';
export default function CreatePostModal(props) {
	console.log(props);
	const [image, setImage] = useState(['', '', '', '', '']);
	const [res, setRes] = useState([]);
    const [title,setTitle]=useState();
    const [description, setDescription] = useState();
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
			const photos = image.filter((item) => item);
			const base64 = res.filter((item) => item != '');
			console.log(photos.indexOf(''));
			photos.push(result.assets[0].uri);
			base64.push(result.assets[0]);
			for (let index = photos.length; index < 5; index++) {
				photos.push('');
			}
			//photos.push('')
			console.log(photos);
			setImage(photos);
			setRes(base64);
			console.log(base64);
			//setRes(result.assets[0].base64);
		}
	};
	const handleSubmit = () => {
        //console.log(description)
		Axios.post(API_ENDPOINTS.CREATE_POST_MOBILE, {
			images: res,
			user_id: user_id,
			community_id: props.id,
            title:title,
            description:description,
		}).then((response) => {
			console.log(response.data);
		});
	};
	return (
		<Modal
			dismissable={true}
			visible={true}
			onDismiss={() => props.closeFun()}
			// onDismiss={handleModal}
			contentContainerStyle={{
				backgroundColor: 'white',
				width: '98%',
				justifyContent: 'center',
				alignItems: 'center',
				alignSelf: 'center',
				borderRadius: 10,
				height: '80%',
			}}
		>
			<View style={{height: '100%', width: '100%'}}>
				<View style={{width: '100%', height: '11%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={{borderRadius: 40, width: '36%', height: '55%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', left: '10%',borderColor:'black',borderWidth:2}}>
							<Text style={{fontFamily: 'Poppins-medium', fontSize: 14, color: '#000'}}>Hide keyboard</Text>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={props.closeFun}>
						<View style={{borderRadius: 40, width: 40, height: 40, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', right: '10%'}}>
							<EvilIcons name='close' size={30} color={'white'} />
						</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={{width: '100%', height: '89%', alignItems: 'center'}}>
					<TextInputField placeholder='Title' function={setTitle} />
					<TextInput
						style={{
							marginBottom: '1%',
							backgroundColor: 'white',
							borderWidth: 1,
							borderColor: '#76B693',
							padding: 8,
							fontSize: 15,
							textAlignVertical: 'top',
							height: '47%',
							width: '95%',
							borderRadius: 8,
						}}
						placeholder='Description...'
						multiline={true}
						numberOfLines={5}
						onChangeText={(event) => setDescription(event)}
					/>
					<View
						style={{
							width: '100%',
							height: 100,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
						}}
					>
						{image.map((item) =>
							item == '' ? (
								<TouchableOpacity onPress={pickImage} key={Math.random()}>
									<View
										style={{
											width: 70,
											height: 70,
											marginRight: 1,
											borderRadius: 3,
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor: '#F0F0F0',
										}}
									>
										<MaterialIcons name='add-a-photo' size={32} color='#afafaf' />
									</View>
								</TouchableOpacity>
							) : (
								<Image key={Math.random()} source={{uri: item}} style={{width: 70, height: 70, borderRadius: 12}} />
							)
						)}
						{/* <TouchableOpacity onPress={pickImage}>
							<View
								style={{
									width: 70,
									height: 70,
									marginRight: 1,
									borderRadius: 3,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#F0F0F0',
								}}
							>
								<MaterialIcons name='add-a-photo' size={32} color='#afafaf' />
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View
								style={{
									width: 70,
									height: 70,
									marginRight: 1,
									borderRadius: 3,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#F0F0F0',
								}}
							>
								<MaterialIcons name='add-a-photo' size={32} color='#afafaf' />
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View
								style={{
									width: 70,
									height: 70,
									marginRight: 1,
									borderRadius: 3,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#F0F0F0',
								}}
							>
								<MaterialIcons name='add-a-photo' size={32} color='#afafaf' />
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View
								style={{
									width: 70,
									height: 70,
									marginRight: 1,
									borderRadius: 3,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#F0F0F0',
								}}
							>
								<MaterialIcons name='add-a-photo' size={32} color='#afafaf' />
							</View>
						</TouchableOpacity>
						<TouchableOpacity>
							<View
								style={{
									width: 70,
									height: 70,
									marginRight: 1,
									borderRadius: 3,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#F0F0F0',
								}}
							>
								<MaterialIcons name='add-a-photo' size={32} color='#afafaf' />
							</View>
						</TouchableOpacity> */}
					</View>
					<TouchableOpacity
						style={{
							width: 150,
							height: '30%',
							backgroundColor: '#76B693',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 30,
						}}
						onPress={handleSubmit}
					>
						<View
							style={{
								width: '100%',
								height: '100%',
								backgroundColor: '#76B693',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 30,
							}}
						>
							<Text style={{fontFamily: 'Poppins-medium', fontSize: 18, color: '#fff'}}>Create</Text>
						</View>
					</TouchableOpacity>
					{/* <Textarea
						containerStyle={{
							height: 180,
							padding: 5,
							backgroundColor: '#d8d8d8',
							width: '95%',
							borderRadius: 5,
						}}
						maxLength={120}
						placeholder={'Description...'}
						placeholderTextColor={'#4D4C44'}
						underlineColorAndroid={'transparent'}
					/> */}
				</View>
			</View>
		</Modal>
	);
}
