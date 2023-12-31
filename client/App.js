import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import Landing from './views/user/Landing';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Constants from 'expo-constants';
import CustomerMain from './views/customer/CustomerMain';
import EventOrganizerMain from './views/customer/EventOrganizerMain';
import DeliveryMain from './views/delivery/DeliveryMain';
import {useSelector, useDispatch} from 'react-redux';
import {isLoaded, useFonts} from 'expo-font';
import * as Network from 'expo-network';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PortalProvider} from '@gorhom/portal';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {StripeProvider} from '@stripe/stripe-react-native';
import {STRIPE_PUBLIC_KEY} from './keys/Keys';
import * as Location from 'expo-location';
import * as ALL_ACTIONS from './actions/AllActions';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import OtpInputs from 'react-native-otp-inputs';

//config my new redux

const AppWrapper = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [ipAddress, setIpAddress] = useState('');
	let [fontsLoaded] = useFonts({
		'Poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
		'Poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
		'Poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
		'Poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
		'Yellowtail-Regular': require('./assets/fonts/Yellowtail-Regular.ttf'),
		'RammettoOne-Regular': require('./assets/fonts/RammettoOne-Regular.ttf'),
		'Gabarito-Bold': require('./assets/fonts/Gabarito-Bold.ttf'),
	});
	useEffect(() => {
		async function prepare() {
			SplashScreen.preventAutoHideAsync();
		}
		prepare();
	}, []);
	if (!fontsLoaded) {
		return undefined;
	} else {
		SplashScreen.hideAsync();
	}
	return (
		<Provider store={store}>
			<StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
				<GestureHandlerRootView style={{flex: 1}}>
					<SafeAreaProvider>
						<App />
					</SafeAreaProvider>
				</GestureHandlerRootView>
			</StripeProvider>
		</Provider>
	);
};
const App = () => {
	var user = useSelector((state) => state.userReducer.user);
	var user_id = useSelector((state) => state.userReducer.userid);
	//const [user, setUser] = useState('customer');
	const [index, setIndex] = useState(0);
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: user ? 0 : 0,
		},
		topBar: {
			width: '100%',
			height: '22%',
			backgroundColor: 'red',
		},
		content: {
			width: '100%',
			height: '76%',
			backgroundColor: 'royalblue',
			justifyContent: 'center',
			alignItems: 'center',
		},
		bottomBar: {
			width: '100%',
			height: '12%',
			backgroundColor: 'dodgerblue',
		},
	});
	return (
		<PortalProvider>
			<SafeAreaView style={styles.container}>
				<StatusBar style='dark' />

				{/* <Header/> */}
				<BottomSheetModalProvider>
					<NavigationContainer>
						{user == 'Customer' ? (
							<PaperProvider>
								<CustomerMain id={user_id} />
							</PaperProvider>
						) : user == 'eventorganizer' ? (
							<PaperProvider>
								<EventOrganizerMain />
							</PaperProvider>
						) : user == 'deliveryPerson' ? (
							<PaperProvider>
								<DeliveryMain />
							</PaperProvider>
						) : (
							<Landing />
						)}
					</NavigationContainer>
				</BottomSheetModalProvider>
			</SafeAreaView>
		</PortalProvider>
	);
};

export default AppWrapper;
