import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { API_CONFIG, validatePasswordAPI, ValidatePasswordResponse } from '../utils/apiConfig';
import { RootStackParamList } from '../types/navigation';

type PasswordScreenProps = StackScreenProps<RootStackParamList, 'PasswordScreen'>;

export default function PasswordScreen({ route, navigation }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [isLoginEnabled, setIsLoginEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userEmail, authToken } = route.params;

  useEffect(() => {
    // Enable Login button only if password has content
    setIsLoginEnabled(password.trim().length > 0);
  }, [password]);

  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    try {
      setIsLoading(true);
      
      // Create request body using the API helper function
      const requestBody = validatePasswordAPI.createRequest(password);
      
      // Call the Validate Password API
      const response = await axios.post<ValidatePasswordResponse>(
        API_CONFIG.VALIDATE_PASSWORD_ENDPOINT,
        requestBody,
        {
          headers: {
            ...API_CONFIG.HEADERS,
            'a_t': authToken, // Use the token from identity validation
          },
          timeout: API_CONFIG.TIMEOUT,
        }
      );

      console.log('Password validation response:', response.data);
      console.log('Full response object:', response);

      // Process the response using the exact pre-request script logic
      // Pass full response to extract Set-Cookie headers as specified in pre-request script
      const result = validatePasswordAPI.processResponse(response.data, response);
      
      if (result.success) {
        // Login successful - store Set-Cookie headers and navigate to home (exact logic from pre-request script)
        // "If success === 1 inside validatePassword in data → Login successful → Store the response.request.responseheaders.Set-Cookie → Redirect the user to the Home page"
        // Note: Pre-request script says "there is not auth token in response just validate for success, if 1 then move forward"
        console.log('Login successful - password validation passed');
        
        // Store Set-Cookie headers for next APIs as per pre-request script
        if (result.setCookieHeaders) {
          console.log('Set-Cookie headers stored for next APIs:', result.setCookieHeaders);
        }
        navigation.navigate('Home', { 
          authToken: authToken, // Use the original auth token from identity validation
          setCookieHeaders: result.setCookieHeaders 
        });
      } else {
        // Invalid password or other error - show exact error message from pre-request script
        // "If success === 0 inside validatePassword in data → Show error: 'Invalid Password' → Stay on the same page"
        Alert.alert('Error', result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Password validation error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Forgot password functionality will be implemented');
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
            Welcome to {'\n'}Channel Partner App
          </Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Enter Password</Text>
          <Text style={styles.subtitle}>Securely log in to continue</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordSection}>
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
                
                {/* Forgot Password Button */}
                <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={[
                styles.loginButton, 
                !isLoginEnabled || isLoading ? styles.loginButtonDisabled : null
              ]} 
              onPress={handleLogin}
              disabled={!isLoginEnabled || isLoading}
            >
              <Text style={[
                styles.loginButtonText,
                !isLoginEnabled || isLoading ? styles.loginButtonTextDisabled : null
              ]}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
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
    width: 335,
    alignSelf: 'center',
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
    height: 240,
    gap: 24,
  },
  inputSection: {
    width: 335,
    alignSelf: 'center',
    gap: 16,
  },
  inputContainer: {
    gap: 4,
  },
  passwordSection: {
    gap: 12,
  },
  inputLabel: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#394960',
    paddingHorizontal: 2,
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
    alignSelf: 'center',
    width: 335,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  loginButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  loginButtonText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  loginButtonTextDisabled: {
    color: '#8E8E93',
  },
  termsContainer: {
    marginTop: 'auto',
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