#!/bin/bash

echo "🚀 Setting up Channel Partner App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.x or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18.x or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Expo CLI globally if not already installed
if ! command -v expo &> /dev/null; then
    echo "🔧 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

# Install EAS CLI globally if not already installed
if ! command -v eas &> /dev/null; then
    echo "🔧 Installing EAS CLI globally..."
    npm install -g eas-cli
fi

echo "✅ Dependencies installed successfully!"

# Create assets directory if it doesn't exist
mkdir -p assets

echo "📱 Project setup complete!"
echo ""
echo "Next steps:"
echo "1. Replace placeholder files in assets/ with actual images"
echo "2. Run 'npm start' to start the development server"
echo "3. Run 'npm run ios' or 'npm run android' to test on simulators"
echo "4. Run 'eas build' to create production builds"
echo ""
echo "Happy coding! 🎉" 