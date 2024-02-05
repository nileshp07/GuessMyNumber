import {Children} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';

function PrimaryButton({children, onPress}) {
	return (
		<View style={styles.buttonOutterContainer}>
			<Pressable
				style={({pressed}) =>
					pressed
						? [styles.buttonInnerContainer, styles.pressed]
						: styles.buttonInnerContainer
				}
				onPress={onPress}
				android_ripple={{color: Colors.primary600}}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
}

export default PrimaryButton;

const styles = StyleSheet.create({
	buttonOutterContainer: {
		margin: 4,
		borderRadius: 28,
		backgroundColor: Colors.primary500,
		overflow: 'hidden',
	},
	buttonInnerContainer: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 2,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
	pressed: {
		opacity: 0.75,
	},
});
