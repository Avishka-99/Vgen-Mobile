import React, {useMemo} from 'react';
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated';
const Backdrop = ({animatedIndex, style}) => {
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

	return <Animated.View style={containerStyle} />;
};

export default Backdrop;
