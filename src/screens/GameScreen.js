import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import { useGame, useGameActions, useGameSelectors } from '../services/game/GameContext';
import { GAME_STATUS, PLAYER_COLORS } from '../services/game/gameTypes';

const GameScreen = () => {
  const { players, board, turn, currentPlayer, gameStatus } = useGame();
  const gameActions = useGameActions();
  const selectors = useGameSelectors();

  // Initialize board when component mounts
  useEffect(() => {
    // Only initialize if board doesn't have cells
    if (!board.cells || board.cells.length === 0) {
      gameActions.initializeBoard(8, 'standard');
    }
  }, []);

  const handleAddPlayer = () => {
    const playerNames = ['Alice', 'Bob', 'Charlie', 'Diana'];
    const colors = Object.values(PLAYER_COLORS);
    const playerCount = selectors.getPlayerCount();
    
    if (playerCount >= 4) {
      Alert.alert('Maximum Players', 'Cannot add more than 4 players');
      return;
    }

    const playerName = playerNames[playerCount];
    const playerColor = colors[playerCount];
    
    gameActions.addPlayer(playerName, 'room123', playerColor);
  };

  const handleRemovePlayer = (playerId) => {
    gameActions.removePlayer(playerId);
  };

  const handleStartGame = () => {
    if (!selectors.canStartGame()) {
      Alert.alert('Cannot Start', 'Need at least 2 players to start the game');
      return;
    }
    
    gameActions.startGame('room123', { 
      maxPlayers: 4, 
      timeLimit: 30,
      startingAmount: 1500 
    });
  };

  const handleNextTurn = () => {
    if (selectors.isGameActive()) {
      gameActions.nextTurn();
    }
  };

  const handleResetGame = () => {
    Alert.alert(
      'Reset Game',
      'Are you sure you want to reset the game?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', onPress: () => gameActions.resetGame() }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case GAME_STATUS.WAITING:
        return '#FFA500';
      case GAME_STATUS.IN_PROGRESS:
        return '#00FF00';
      case GAME_STATUS.FINISHED:
        return '#FF0000';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Game Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.title}>Game State Management Demo</Text>
          <Text style={[styles.statusText, { color: getStatusColor(gameStatus) }]}>
            Status: {gameStatus}
          </Text>
          <Text style={styles.infoText}>Turn: {turn + 1}</Text>
          <Text style={styles.infoText}>Board Size: {selectors.getBoardSize()}x{selectors.getBoardSize()}</Text>
        </View>

        {/* Current Player */}
        {currentPlayer && (
          <View style={styles.currentPlayerContainer}>
            <Text style={styles.sectionTitle}>Current Player</Text>
            <View style={styles.playerCard}>
              <View style={[styles.colorCircle, { backgroundColor: currentPlayer.color }]} />
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{currentPlayer.username}</Text>
                <Text style={styles.playerDetails}>Room: {currentPlayer.currentRoomId}</Text>
                <Text style={styles.playerDetails}>Score: {currentPlayer.score}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Players List */}
        <View style={styles.playersContainer}>
          <Text style={styles.sectionTitle}>Players ({selectors.getPlayerCount()}/4)</Text>
          {players.map((player, index) => (
            <View key={player.id} style={styles.playerCard}>
              <View style={[styles.colorCircle, { backgroundColor: player.color }]} />
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.username}</Text>
                <Text style={styles.playerDetails}>Room: {player.currentRoomId}</Text>
                <Text style={styles.playerDetails}>Score: {player.score}</Text>
                <Text style={styles.playerDetails}>
                  {player.id === currentPlayer?.id ? '👑 Current Turn' : `Turn ${index + 1}`}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePlayer(player.id)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAddPlayer}
            disabled={selectors.getPlayerCount() >= 4}
          >
            <Text style={styles.buttonText}>Add Player</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectors.canStartGame() ? styles.startButton : styles.disabledButton
            ]}
            onPress={handleStartGame}
            disabled={!selectors.canStartGame()}
          >
            <Text style={styles.buttonText}>
              {gameStatus === GAME_STATUS.WAITING ? 'Start Game' : 'Game Started'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectors.isGameActive() ? styles.nextTurnButton : styles.disabledButton
            ]}
            onPress={handleNextTurn}
            disabled={!selectors.isGameActive()}
          >
            <Text style={styles.buttonText}>Next Turn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleResetGame}
          >
            <Text style={styles.buttonText}>Reset Game</Text>
          </TouchableOpacity>
        </View>

        {/* Debug Info */}
        <View style={styles.debugContainer}>
          <Text style={styles.debugTitle}>Debug Info</Text>
          <Text style={styles.debugText}>Active Players: {selectors.getActivePlayers().length}</Text>
          <Text style={styles.debugText}>Can Start Game: {selectors.canStartGame() ? 'Yes' : 'No'}</Text>
          <Text style={styles.debugText}>Is Game Active: {selectors.isGameActive() ? 'Yes' : 'No'}</Text>
          {selectors.getNextPlayer() && (
            <Text style={styles.debugText}>Next Player: {selectors.getNextPlayer().username}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1033',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusContainer: {
    backgroundColor: 'rgba(13, 36, 68, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
  },
  currentPlayerContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  playersContainer: {
    backgroundColor: 'rgba(13, 36, 68, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3b5998',
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 89, 152, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  playerDetails: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 2,
  },
  removeButton: {
    backgroundColor: '#FF4444',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    gap: 15,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#00AA00',
  },
  startButton: {
    backgroundColor: '#FF6600',
  },
  nextTurnButton: {
    backgroundColor: '#0066FF',
  },
  resetButton: {
    backgroundColor: '#AA0000',
  },
  disabledButton: {
    backgroundColor: '#666666',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#666666',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  debugText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 5,
  },
});

export default GameScreen; 