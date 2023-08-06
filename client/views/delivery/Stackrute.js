import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Delivery from './screens/Delivery';
import Delivery from './screens/Delivery';

function Stackrute(props) {
    const stack=createStackNavigator()
    return (
        <stack.Navigator>
            <stack.Screen name='Delivery' component={Delivery}/>
        </stack.Navigator>
    );
}

export default Stackrute;