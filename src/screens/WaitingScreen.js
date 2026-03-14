import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PLAYER_COLORS } from '../services/game/gameTypes';
import { useGame, useGameSelectors } from '../services/game/GameContext';

const { width } = Dimensions.get('window');

const getPlayerColorValue = (colorKey) => {
  return PLAYER_COLORS[colorKey] || PLAYER_COLORS.RED;
};

export default function WaitingScreen() {
  const { players, gameStatus, roomId, turn, currentPlayer, gameSettings } = useGame();
  const { getPlayerCount, canStartGame, getCurrentPlayer } = useGameSelectors();

  return (
    <View style={styles.waitingContainer}>
      <Text style={styles.waitingText}>Game Lobby</Text>
      
      {/* Game Status Section */}
      <View style={styles.gameStatusSection}>
        <Text style={styles.sectionTitle}>Game Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={[styles.statusValue, { color: getStatusColor(gameStatus) }]}>
            {gameStatus || 'WAITING'}
          </Text>
        </View>
        {roomId && (
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Room ID:</Text>
            <Text style={styles.statusValue}>{roomId}</Text>
          </View>
        )}
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Players:</Text>
          <Text style={styles.statusValue}>{getPlayerCount()}/4</Text>
        </View>
        {currentPlayer && (
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Current Turn:</Text>
            <Text style={styles.statusValue}>{currentPlayer.username}</Text>
          </View>
        )}
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Can Start:</Text>
          <Text style={[styles.statusValue, { color: canStartGame() ? '#4CAF50' : '#F44336' }]}>
            {canStartGame() ? 'Yes' : 'No'}
          </Text>
        </View>
      </View>

      {/* Players Section */}
      {players.length > 0 && (
        <View style={styles.playersSection}>
          <Text style={styles.sectionTitle}>Players in Room ({players.length})</Text>
          <ScrollView style={styles.playersList} showsVerticalScrollIndicator={false}>
            {players.map((player, index) => (
              <View key={`player-${player.id}-${index}`} style={styles.playerItem}>
                {/* Player Color Circle */}
                <View style={[
                  styles.playerColorCircle, 
                  { backgroundColor: getPlayerColorValue(player.color) }
                ]}>
                  <Text style={styles.playerNumber}>{index + 1}</Text>
                </View>
                
                {/* Player Info */}
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{player.username}</Text>
                  <Text style={styles.playerColor}>
                    Color: {player.color || 'Not assigned'}
                  </Text>
                  {player.isActive !== undefined && (
                    <Text style={[
                      styles.playerStatus, 
                      { color: player.isActive ? '#4CAF50' : '#F44336' }
                    ]}>
                      {player.isActive ? 'Active' : 'Inactive'}
                    </Text>
                  )}
                </View>
                
                {/* Badges */}
                <View style={styles.badgeContainer}>
                  {index === 0 && <Text style={styles.hostBadge}>HOST</Text>}
                  {currentPlayer && currentPlayer.id === player.id && (
                    <Text style={styles.currentTurnBadge}>TURN</Text>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Waiting Message */}
      {players.length === 0 && (
        <Text style={styles.emptyMessage}>
          Waiting for players to join...
        </Text>
      )}
      
      {players.length > 0 && !canStartGame() && (
        <Text style={styles.waitingMessage}>
          Need at least 2 players to start the game
        </Text>
      )}
    </View>
  );
}

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'WAITING': return '#FFC107';
    case 'IN_PROGRESS': return '#4CAF50';
    case 'FINISHED': return '#F44336';
    default: return '#f7e6b7';
  }
};

const styles = StyleSheet.create({
  waitingContainer: {
    flex: 1,
    backgroundColor: '#0a1033',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  waitingText: {
    color: '#f7e6b7',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#f7e6b7',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  gameStatusSection: {
    backgroundColor: '#1a1a3a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a5a',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    color: '#b8b8d4',
    fontSize: 16,
    fontWeight: '500',
  },
  statusValue: {
    color: '#f7e6b7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playersSection: {
    backgroundColor: '#1a1a3a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a5a',
    flex: 1,
  },
  playersList: {
    maxHeight: 300,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#231a4a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3a3a6a',
  },
  playerColorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  playerNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: '#f7e6b7',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  playerColor: {
    color: '#b8b8d4',
    fontSize: 14,
    marginBottom: 2,
  },
  playerStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  badgeContainer: {
    alignItems: 'flex-end',
  },
  hostBadge: {
    backgroundColor: '#FFD700',
    color: '#0a1033',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  currentTurnBadge: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  gameSettingsSection: {
    backgroundColor: '#1a1a3a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a5a',
  },
  emptyMessage: {
    color: '#b8b8d4',
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 50,
  },
  waitingMessage: {
    color: '#FFC107',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
}); 