# Indian Business Game

A React Native multiplayer board game inspired by classic business strategy games like Monopoly. Build your empire, trade properties, and dominate the Indian business landscape!

## 🎮 Features

- **Multiple Game Modes**
  - Single Player vs Computer
  - Online Multiplayer (WebSocket-based)
  - Customizable player count (2-6 players)

- **Player Customization**
  - Choose from 6 different player colors
  - Configurable starting amounts
  - Player profiles with authentication

- **Game Features**
  - Classic board game mechanics
  - Property trading and management
  - Real-time multiplayer gameplay
  - Game state persistence
  - Chat functionality

## 🏗️ Project Structure

The project has been completely restructured for better organization and maintainability:

```
indian-business-game/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── GameMenuHeader.js
│   │   │   └── GameMenuButton.js
│   │   ├── modals/               # Modal components
│   │   │   ├── PlayerSelectionModal.js
│   │   │   ├── ColorSelectionModal.js
│   │   │   ├── AmountSelectionModal.js
│   │   │   └── LoginModal.js
│   │   └── game/                 # Game-specific components
│   │
│   ├── screens/
│   │   └── game/                 # Game screens
│   │       ├── WelcomeScreen.js
│   │       └── GameMenuScreen.js
│   │
│   ├── services/
│   │   └── network/              # Network services
│   │       ├── authService.js
│   │       └── gameWebSocketService.js
│   │
│   ├── constants/                # App constants
│   │   ├── gameConfig.js
│   │   └── serverConfig.js
│   │
│   ├── styles/                   # Style definitions
│   │   ├── common/
│   │   └── game/
│   │
│   ├── utils/                    # Utility functions
│   │   ├── common/
│   │   └── game/
│   │
│   └── hooks/                    # Custom React hooks
│       └── game/
│
├── assets/                       # Images and assets
├── App.js                       # Main app component
├── index.js                     # Entry point
├── package.json
└── app.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- React Native development environment
- Expo CLI (if using Expo)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indian-business-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure server settings**
   Edit `src/constants/serverConfig.js` to match your backend server configuration:
   ```javascript
   const DEVELOPMENT_CONFIG = {
     WS_SERVER_HOST: 'your-websocket-server.com',
     API_SERVER_HOST: 'your-api-server.com',
     WS_PORT: 9000,
     API_PORT: 8080,
   };
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on device/simulator**
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   ```

## 🎯 Game Configuration

The game behavior can be customized through `src/constants/gameConfig.js`:

```javascript
export const GAME_CONFIG = {
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 6,
  DEFAULT_PLAYERS: 2,
  STARTING_AMOUNTS: [1000, 2000, 5000, 10000, 15000],
  DEFAULT_STARTING_AMOUNT: 2000,
  PLAYER_COLORS: [...], // Available player colors
  // ... more configuration options
};
```

## 🎨 Theme Customization

Colors and styling can be customized through `src/constants/gameConfig.js`:

```javascript
export const THEME_COLORS = {
  primary: '#1a4275',      // Main theme color
  secondary: '#ffd700',    // Accent color
  accent: '#ff5733',       // Action button color
  background: '#1a4275',   // Screen background
  // ... more color definitions
};
```

## 🔧 Architecture

### Service Layer
- **AuthService**: Handles user authentication with token management
- **GameWebSocketService**: Manages real-time multiplayer communication

### State Management
- React hooks for local state management
- Context API for global state (if needed)
- AsyncStorage for data persistence

### Navigation
- React Navigation v6 for screen navigation
- Centralized screen name constants

### Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Graceful fallbacks

## 🎮 How to Play

1. **Welcome Screen**: Start the game from the main welcome screen
2. **Game Menu**: Choose between Computer vs Player or Online Multiplayer
3. **Setup**: Select number of players, choose your color, and set starting amount
4. **Gameplay**: Trade properties, collect rent, and build your business empire!

## 🌐 Online Multiplayer

The game supports real-time multiplayer through WebSocket connections:

- **Room Creation**: Create private game rooms
- **Player Matching**: Join existing rooms
- **Real-time Updates**: Live game state synchronization
- **Chat System**: Communicate with other players

## 🔐 Authentication

- Secure user authentication with JWT tokens
- Token refresh mechanism
- Offline gameplay support
- Progress synchronization

## 🛠️ Development

### Code Style
- ES6+ JavaScript (not TypeScript as requested)
- Functional components with hooks
- Consistent naming conventions
- Comprehensive error handling

### Testing
```bash
npm test
```

### Building
```bash
npm run build
```

## 📱 Platform Support

- **iOS**: iOS 11.0+
- **Android**: Android 5.0+ (API level 21)
- **Web**: Modern browsers (if using Expo Web)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by classic board games like Monopoly
- Built with React Native and Expo
- Uses WebSocket for real-time multiplayer functionality

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## Recent Updates

### Player Management in Multiplayer Rooms

The app now automatically adds players to the game state when they join or create rooms:

#### Features Added:
1. **Automatic Player Addition**: When users join or create rooms via WebSocket, they are automatically added to the game state
2. **Player Display**: The waiting screen now shows all players who have joined the room with their assigned colors
3. **Color Assignment**: Players are automatically assigned colors from the available color palette
4. **Host Identification**: The first player (room creator) is marked as HOST
5. **Real-time Updates**: Player list updates in real-time as players join or leave

#### How It Works:
1. When a user creates a room, they are added to the game state as the first player
2. When other users join the room via WebSocket, they receive messages and are added to the game state
3. Each player gets a unique color assigned automatically
4. The waiting screen displays all players with their colors and host status
5. WebSocket messages are handled to update the game state appropriately

#### Files Modified:
- `components/OnlineMultiplayerScreen.js` - Added game state integration and message handling
- `components/WaitingScreen.js` - Added player list display
- `handlers/onlineMultiplayerHandlers.js` - Updated to support custom message handlers
- `utils/WebSocketService.js` - Enhanced message handling (existing)
- `utils/GameContext.js` - Game state management (existing)

#### WebSocket Message Handling:
The system now handles various WebSocket message types:
- `PLAYER_JOINED` / `JOIN_ROOM` - Adds new players to game state
- `PLAYER_LEFT` - Removes players from game state  
- `ROOM_CREATED` / `CREATE_ROOM` - Sets up room in game state
- `GAME_STARTED` - Updates game status

#### Usage:
Players are automatically managed - no manual intervention required. Simply create or join a room and the game state will be updated automatically with all participants.

---

**Note**: This is a restructured and improved version of the original project with better organization, cleaner code, and enhanced functionality. 