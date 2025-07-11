import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route, navigation }: HomeScreenProps) {
  const { authToken, setCookieHeaders } = route.params || {};

  const handleProfileClick = () => {
    Alert.alert('Profile', 'Profile functionality will be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#CFD7E2" />
      
      {/* Background Image */}
      <Image source={require('../../assets/updated-home-bg-image.png')} style={styles.backgroundImage} />
      
      {/* Centered Container */}
      <View style={styles.centeredContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/home-logo.png')} style={styles.logo} resizeMode="contain" />
          </View>
          
          {/* Profile Button */}
          <TouchableOpacity style={styles.profileButton} onPress={handleProfileClick}>
            <Text style={styles.profileButtonText}>Hey Partner, click to view your Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFD7E2',
  },
  backgroundImage: {
    position: 'absolute',
    top: -229,
    left: -36.57,
    width: 652,
    height: 632,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    width: '100%',
    maxWidth: 375,
  },
  logoContainer: {
    width: 279,
    height: 278.39,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 279,
    height: 278.39,
  },
  profileButton: {
    backgroundColor: '#246EF6',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  profileButtonText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
}); 