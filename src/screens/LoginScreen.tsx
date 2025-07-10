import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login pressed');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#CFD7E2" />
      
      {/* Background Image */}
      <Image source={require('../../assets/bg-image.png')} style={styles.backgroundImage} />
      
      {/* Header Section */}
      <View style={styles.header}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        
        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome to the{'\n'}AI Generated App
          </Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login to Your Account</Text>
          <Text style={styles.subtitle}>Securely log in to continue</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone number/Email Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="annie@canon.com"
                  placeholderTextColor="#607A9F"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="•••••••••"
                  placeholderTextColor="#607A9F"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Terms Text */}
        <Text style={styles.termsText}>
          By signing in you agree with our Terms of Service and accept our Privacy Policy
        </Text>
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoContainer: {
    width: 180,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 45.75,
  },
  welcomeContainer: {
    alignItems: 'center',
    gap: 12,
  },
  welcomeText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: '#041A2F',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 5,
    gap: 28,
  },
  titleContainer: {
    gap: 4,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 28,
    color: '#041A2F',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#394960',
  },
  formContainer: {
    flex: 1,
    gap: 145,
  },
  inputSection: {
    width: 335,
    alignSelf: 'center',
    gap: 16,
  },
  inputContainer: {
    gap: 4,
  },
  inputLabel: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#394960',
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#CFD7E2',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: '#041A2F',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    height: 20,
    justifyContent: 'center',
  },
  forgotPasswordText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#246EF6',
  },
  loginButton: {
    backgroundColor: '#246EF6',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  loginButtonText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  termsText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#041A2F',
    width: 335,
    alignSelf: 'center',
  },
}); 