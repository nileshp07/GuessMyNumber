import {useCallback, useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import EndGameScreen from './screens/EndGameScreen';
import Colors from './constants/colors';
import {StatusBar} from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [gameIsOver, setGameIsOver] = useState(false);
	const [guessRounds, setGuessRounds] = useState(0);

	const [fontsLoaded, fontError] = useFonts({
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);
	if (!fontsLoaded && !fontError) {
		return null;
	}

	function pickedNumberHandler(choosenNumber) {
		setUserNumber(choosenNumber);
	}

	function gameOverHandler(numberOfRounds) {
		setGameIsOver(true);
		setGuessRounds(numberOfRounds);
	}

	function startNewGameHandler() {
		setUserNumber(null);
		setGameIsOver(false);
		setGuessRounds(0);
	}

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber)
		screen = (
			<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
		);

	if (gameIsOver)
		screen = (
			<EndGameScreen
				userNumber={userNumber}
				roundsNumber={guessRounds}
				onStartNewGame={startNewGameHandler}
			/>
		);

	return (
		<>
			<StatusBar style='light' />
			<LinearGradient
				colors={[Colors.primary600, Colors.accent500]}
				style={styles.rootScreen}
				onLayout={onLayoutRootView}
			>
				<ImageBackground
					source={require('./assets/images/background.jpg')}
					resizeMode='cover'
					style={styles.rootScreen}
					imageStyle={styles.backgroundImage}
				>
					<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
				</ImageBackground>
			</LinearGradient>
		</>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.15,
	},
});
