import React, {useMemo} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated';
const Backdrop = ({animatedIndex, style, dismiss}) => {
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(animatedIndex.value, [0, 1], [0.75, 1], Extrapolate.CLAMP),
	}));

	// styles
	const containerStyle = useMemo(
		() => [
			style,
			{
				backgroundColor: 'rgba(0,0,0,0.5)',
			},
			containerAnimatedStyle,
		],
		[style, containerAnimatedStyle]
	);

	return (
		<TouchableWithoutFeedback onPress={dismiss}>
			<Animated.View style={containerStyle} />
		</TouchableWithoutFeedback>
	);
};

export default Backdrop;
