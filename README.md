# Channel Partner App

A React Native mobile app built with Expo 52 for channel partner authentication and management.

## Features

- **Login Screen**: Beautiful login interface with social authentication options
- **Social Login**: Apple and Google sign-in integration
- **Form Validation**: Email and password input validation
- **Responsive Design**: Mobile-first design based on Figma specifications
- **Modern UI**: Clean, professional interface with smooth animations

## Prerequisites

- Node.js (18.x or higher)
- Expo CLI
- EAS CLI (for builds)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```

## Development

To start the development server:

```bash
npm start
```

To run on iOS:
```bash
npm run ios
```

To run on Android:
```bash
npm run android
```

To run on web:
```bash
npm run web
```

## Building

To build the app using EAS:

```bash
npm run build
```

## Project Structure

```
src/
├── screens/
│   └── LoginScreen.tsx    # Main login screen component
├── components/            # Reusable UI components
├── assets/               # Images, fonts, and other assets
└── utils/                # Helper functions and utilities
```

## Design

The app design is based on the Figma specifications provided, featuring:
- Light color scheme with blue accents
- Inter font family
- Rounded corners and subtle shadows
- Mobile-optimized layout (375px width)

## Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo 52**: Development platform and build system
- **TypeScript**: Type-safe JavaScript development
- **React Navigation**: Navigation library
- **Expo Vector Icons**: Icon library
- **React Native Safe Area Context**: Safe area handling

## Configuration

The app is configured with:
- Bundle identifier: `com.channelpartner.app`
- Orientation: Portrait only
- Target platforms: iOS and Android
- TypeScript support enabled

## Assets

Place the following assets in the `assets/` folder:
- `icon.png` - App icon (512x512px)
- `splash.png` - Splash screen image
- `adaptive-icon.png` - Android adaptive icon
- `favicon.png` - Web favicon

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Test on both iOS and Android platforms
4. Follow React Native best practices

## License

This project is proprietary and confidential. 