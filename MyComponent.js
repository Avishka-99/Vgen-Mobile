import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { incrementCounterAction, decrementCounterAction } from './actions/counterAction';
class MyComponent extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginVertical: 50 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}> Counter Value = {this.props.counter} </Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Button title="Increment +1" style={{ marginVertical: 50 }} onPress={() => { this.props.increaseCounter(1) }} />
                </View>
                <View style={{ marginVertical: 5 }}>
                    <Button title="Increment +5" style={{ marginVertical: 50 }} onPress={() => { this.props.increaseCounter(5) }} />
                </View>
                <View style={{ marginVertical: 50 }}>
                    <Button title="Decrement -1" onPress={() => { this.props.decreaseCounter() }} />
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        increaseCounter: (parameter) => {
            dispatch(incrementCounterAction(parameter))
        },
        decreaseCounter: () => {
            dispatch(decrementCounterAction())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);