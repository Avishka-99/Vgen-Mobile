import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MyComponent from './components/MyComponent';
import MyButton from './components/MyButton';
import SignIn from './views/user/SignIn';
import SignUp from './views/user/SignUp';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DefaultTheme, DarkTheme, Provider as PaperProvider, BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
const Tab = createMaterialBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Feed"
        component={MyButton}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={MyComponent}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const App = () => {
  const [user, setUser] = useState('');
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    music: MyButton,
    albums: MyComponent,

  });
  const screenOptions = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: user ? Constants.statusBarHeight : 0
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
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        {user == 'customer' ? <PaperProvider>
          <View style={styles.topBar} ></View>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            theme={{ colors: { secondaryContainer: "yellow" } }}
          />
        </PaperProvider> : <SignIn />}

        {/*<StatusBar barStyle={'dark-content'} />
        <View style={styles.topBar} ></View>
        <View style={styles.content}>
          <MyButton/>
        </View>
        <View style={styles.bottomBar}></View>*/}
      </SafeAreaView>

    </Provider>
  );
};

export default App; 