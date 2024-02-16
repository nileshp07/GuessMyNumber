import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function EndGameScreen({roundsNumber, userNumber, onStartNewGame}) {
	const {width, height} = useWindowDimensions();

	let imageSize = 300;

	if (width < 360) imageSize = 170;

	if (height < 400) imageSize = 170;

	const imageStyle = {
		width: imageSize,
		height: imageSize,
		borderRadius: imageSize / 2,
		margin: 16,
	};

	const titleWide = {
		marginVertical: height < 400 ? 0 : 46,
	};

	return (
		<ScrollView style={styles.screen}>
			<View style={styles.rootContainer}>
				<Title style={[styles.title, titleWide]}>GAME OVER!</Title>
				<View style={[styles.imageContainer, imageStyle]}>
					<Image
						style={styles.image}
						source={require('../assets/images/success.png')}
					/>
				</View>
				<Text style={styles.summaryText}>
					Your Phone needed{' '}
					<Text style={styles.highlight}>{roundsNumber} </Text>
					rounds to guess the number
					<Text style={styles.highlight}>{userNumber}</Text>.
				</Text>
				<PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
			</View>
		</ScrollView>
	);
}

export default EndGameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 36,
	},

	imageContainer: {
		borderWidth: 2,
		borderColor: Colors.primary800,
		overflow: 'hidden',
		margin: 36,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	summaryText: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center',
		marginBottom: 24,
	},
	highlight: {
		fontFamily: 'open-sans-bold',
		color: Colors.primary500,
	},
});
