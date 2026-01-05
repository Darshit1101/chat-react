# Chat React

A real-time chat application built with React and Vite.

## Features

- Real-time messaging with Socket.IO
- User authentication (Login/Register)
- Two-factor authentication (2FA)
- Google OAuth integration
- Dashboard
- Responsive UI with Material-UI

## Tech Stack

- **Frontend**: React 19, Vite
- **UI**: Material-UI (MUI)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Real-time**: Socket.IO Client
- **Device Fingerprinting**: FingerprintJS
- **Date Handling**: Day.js

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Darshit1101/chat-react.git
   cd chat-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

- Register or login to access the chat.
- Enable 2FA for added security.
- Start chatting in real-time.

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues
- `npm run preview`: Preview production build

## Project Structure

- `src/pages/`: Page components (Auth, Chat, Dashboard, etc.)
- `src/components/`: Reusable components (Modal, etc.)
- `src/stores/`: Zustand stores (useAuth)
- `src/services/`: API services
- `src/hooks/`: Custom hooks
- `src/utils/`: Utility functions
- `src/configs/`: Configurations (socket)
- `src/constants/`: Constants (apiList, environment)

## Contributing

Feel free to contribute by opening issues or pull requests.

## License

This project is private.
