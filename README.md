
# Test Yourself Client

This is the frontend (client) for the Test Yourself app. It is built with React and TypeScript.

## Download
Clone this client project from GitHub:
```bash
git clone https://github.com/Evyatar-Hazan/test-yourself.git
cd test-yourself
```

**Server Repository**: The server is in a separate repository at:
```bash
git clone https://github.com/Evyatar-Hazan/test-yourself-server.git
```

## Dependencies
**Important:** This client depends on the Test Yourself Server to function properly. You must run both the server and client together.

1. **Server must be running first** - The client makes API calls to the server
2. **Default ports**: Server runs on port 5000, Client runs on port 3000
3. **CORS is configured** for local development between these ports

## Features
- User authentication
- Test creation and participation
- Comments and posts
- User profiles
- Internationalization (i18n)
- Responsive design

## Project Structure
- `src/` - Main source code
  - `components/` - Reusable UI components
  - `features/` - Redux slices and feature logic
  - `hooks/` - Custom React hooks
  - `i18n/` - Internationalization setup
  - `navigation/` - App navigation
  - `screens/` - Main app screens (Home, Profile, Exam, etc.)
  - `services/` - API and auth services
  - `store/` - Redux store setup
  - `theme/` - Theme and styling
  - `types/` - TypeScript types
  - `utils/` - Utility functions

## How to Run

**Prerequisites:** Make sure you have Node.js installed on your system.

### Step 1: Start the Server First
Clone and start the server repository:
```bash
git clone https://github.com/Evyatar-Hazan/test-yourself-server.git
cd test-yourself-server
npm install
node server.js
```
The server will run on [http://localhost:5000](http://localhost:5000).

### Step 2: Start the Client
In a new terminal, clone and start this client:
```bash
git clone https://github.com/Evyatar-Hazan/test-yourself.git
cd test-yourself
npm install
npm start
```
The app will run on [http://localhost:3000](http://localhost:3000).

### Full Setup (Both Server and Client)
```bash
# Terminal 1 - Clone and Start Server
git clone https://github.com/Evyatar-Hazan/test-yourself-server.git
cd test-yourself-server
npm install
node server.js

# Terminal 2 - Clone and Start Client (in a new terminal window)
git clone https://github.com/Evyatar-Hazan/test-yourself.git
cd test-yourself
npm install
npm start
```## Build
To create a production build:
```bash
npm run build
```

## Testing
To run tests:
```bash
npm test
```

## Notes
- Make sure the server is running for full functionality.
- Environment variables can be set in a `.env` file if needed.

## Contact
For questions or issues, contact the repository owner.
