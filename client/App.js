import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Landing from './views/user/Landing';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import CustomerMain from './views/customer/CustomerMain';
import EventOrganizerMain from './views/customer/EventOrganizerMain';
import DeliveryMain from './views/delivery/DeliveryMain'
import { useSelector } from 'react-redux'
import { isLoaded, useFonts } from 'expo-font';
import * as Network from 'expo-network';
import * as SplashScreen from 'expo-splash-screen'

//config my new redux

const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ipAddress, setIpAddress] = useState('');
  let [fontsLoaded] = useFonts({
    "Poppins-light": require('./assets/fonts/Poppins-Light.ttf'),
    "Poppins-medium": require('./assets/fonts/Poppins-Medium.ttf'),
    "Poppins-regular": require('./assets/fonts/Poppins-Regular.ttf'),
    "Poppins-semibold": require('./assets/fonts/Poppins-SemiBold.ttf')
  });
  useEffect(() => {
    async function prepare() {
      SplashScreen.preventAutoHideAsync();
    }
    prepare()
  }, [])
  if (!fontsLoaded) {
    return undefined
  }else{
    SplashScreen.hideAsync();
  }
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )

}
const App = () => {
  var user = useSelector(state => state.userReducer.user);
  console.log("sdfsdf")
  console.log(user);
  //const [user, setUser] = useState('customer');
  const [index, setIndex] = useState(0);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: user ? 0 : 0
    },
    topBar: {
      width: "100%",
      height: "22%",
      backgroundColor: "red",
    },
    content: {
      width: "100%",
      height: "76%",
      backgroundColor: "royalblue",
      justifyContent: "center",
      alignItems: "center",
    },
    bottomBar: {
      width: "100%",
      height: "12%",
      backgroundColor: "dodgerblue"
    }
  })
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <NavigationContainer>
        {user == 'customer' ?
          <PaperProvider>
            <CustomerMain />
          </PaperProvider> : user == 'eventorganizer' ?
            <PaperProvider>
              <EventOrganizerMain />
            </PaperProvider> : user == 'delivery' ?
              <PaperProvider>
                <DeliveryMain />
              </PaperProvider> :
              <Landing />}

        {/*<StatusBar barStyle={'dark-content'} />
          <View style={styles.topBar} ></View>
          <View style={styles.content}>
            <MyButton/>
          </View>
          <View style={styles.bottomBar}></View>*/}
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default AppWrapper; 