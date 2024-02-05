import {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, Text, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GameLogItem from '../components/game/GameLogItem';

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([]);

	const guessRoundsListLength = guessRounds.length;

	useEffect(
		function () {
			if (currentGuess === userNumber) onGameOver(guessRoundsListLength);
		},
		[currentGuess, userNumber, onGameOver]
	);

	// Resetting the min and max boundaries whenever the GameScreen component is first mounted
	useEffect(function () {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	function nextGuessHandler(direction) {
		if (
			(direction === 'lower' && currentGuess < userNumber) ||
			(direction === 'greater' && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie", 'You know this is wrong...', [
				{text: 'Sorry', style: 'cancel'},
			]);
			return;
		}

		if (direction === 'lower') {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}

		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRndNumber);
		setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
	}

	return (
		<View style={styles.screen}>
			<Title>Opponent's Guess</Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>
					Higher or lower
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContanier}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
							<Ionicons name='remove' size={24} />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContanier}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
							<Ionicons name='add' size={24} />
						</PrimaryButton>
					</View>
				</View>
			</Card>
			{/* {guessRounds.map((guessRound) => (
				<Text key={guessRound}>{guessRound}</Text>
			))} */}
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GameLogItem
							roundNumber={guessRoundsListLength - itemData.index}
							guess={itemData.item}
						/>
					)}
					keyExtractor={(item) => item} //item itself is the key as this is an array
				/>
			</View>
		</View>
	);
}

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
	},
	instructionText: {
		marginBottom: 16,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 6,
	},
	buttonContanier: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});
