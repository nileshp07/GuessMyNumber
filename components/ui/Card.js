import {Dimensions, StyleSheet, View} from 'react-native';
import Colors from '../../constants/colors';

function Card({children}) {
	return <View style={styles.inputContainer}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	inputContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: deviceWidth < 380 ? 24 : 23,
		marginHorizontal: 24,
		borderRadius: 8,
		padding: 16,
		backgroundColor: Colors.primary800,
		//android property for boxShadow
		elevation: 8,

		//boxShadow for ios
		shadowColor: 'black',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.25,
		shadowRadius: 6,
	},
});
