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
      <Image source={require('../../assets/home-bg-image.png')} style={styles.backgroundImage} />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIcons}>
          {/* Cellular, WiFi, Battery icons would go here - simplified for now */}
          <View style={styles.cellularIcon} />
          <View style={styles.wifiIcon} />
          <View style={styles.batteryIcon} />
        </View>
      </View>

      {/* Header Section */}
      <View style={styles.header}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/home-logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        
        {/* Profile Button */}
        <TouchableOpacity style={styles.profileButton} onPress={handleProfileClick}>
          <Text style={styles.profileButtonText}>Hey Partner, Click to view Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Empty Frame for additional content */}
      <View style={styles.contentFrame} />
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
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 375,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 7,
  },
  timeText: {
    fontFamily: 'SF Pro Text',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#041A2F',
    textAlign: 'center',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cellularIcon: {
    width: 17,
    height: 10.67,
    backgroundColor: '#041A2F',
    borderRadius: 1,
  },
  wifiIcon: {
    width: 15.33,
    height: 11,
    backgroundColor: '#041A2F',
    borderRadius: 1,
  },
  batteryIcon: {
    width: 24.33,
    height: 11.33,
    backgroundColor: '#041A2F',
    borderRadius: 2.67,
    borderWidth: 1,
    borderColor: '#041A2F',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    width: 375,
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
    alignSelf: 'stretch',
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
  contentFrame: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 12,
  },
}); 