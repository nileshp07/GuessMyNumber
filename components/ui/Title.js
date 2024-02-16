import {Platform, StyleSheet, Text} from 'react-native';
import Colors from '../../constants/colors';

function Title({children, style}) {
	return <Text style={[styles.title, style]}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontFamily: 'open-sans-bold',
		color: Colors.accent500,
		borderBottomWidth: Platform.select({ios: 0, android: 2}),
		borderColor: Colors.accent500,
		borderRadius: 8,
		padding: 12,
		maxWidth: '80%',
		marginBottom: 18,
	},
});
