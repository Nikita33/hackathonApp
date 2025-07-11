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
  Dimensions,
  Alert,
  Animated,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { API_CONFIG, validateIdentityAPI, ValidateIdentityResponse } from '../utils/apiConfig';
import { RootStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');

type LoginScreenProps = StackScreenProps<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [inputType, setInputType] = useState<'email' | 'phone' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const snackbarOpacity = useState(new Animated.Value(0))[0];

  // Email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Phone regex pattern (supports various formats)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

  useEffect(() => {
    // Enable Next button only if input has content and no secondary components are shown
    setIsNextEnabled(inputValue.trim().length > 0 && !showPassword && !showOTP);
  }, [inputValue, showPassword, showOTP]);

  const validateInputType = (value: string) => {
    if (emailRegex.test(value)) {
      return 'email';
    } else if (phoneRegex.test(value.replace(/\s+/g, ''))) {
      return 'phone';
    }
    return null;
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    
    // Animate snackbar in
    Animated.timing(snackbarOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto-hide after 3 seconds
    setTimeout(() => {
      hideSnackbar();
    }, 3000);
  };

  const hideSnackbar = () => {
    // Animate snackbar out
    Animated.timing(snackbarOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSnackbarVisible(false);
    });
  };

  // Validate Identity API call - implementing exact pre-request script logic
  const callValidateIdentityAPI = async (userInput: string) => {
    try {
      setIsLoading(true);
      
      // Create request as per Postman collection
      const requestData = validateIdentityAPI.createRequest(userInput);
      
      console.log('Making Validate Identity API call:', {
        endpoint: API_CONFIG.VALIDATE_IDENTITY_ENDPOINT,
        data: requestData,
        headers: API_CONFIG.HEADERS
      });

      // Make API call with exact headers and data from Postman collection
      const response = await axios.post<ValidateIdentityResponse>(
        API_CONFIG.VALIDATE_IDENTITY_ENDPOINT, 
        requestData, 
        {
          headers: API_CONFIG.HEADERS,
          timeout: API_CONFIG.TIMEOUT,
        }
      );

      console.log('Validate Identity API response:', response.data);

      // Process response according to pre-request script logic
      const result = validateIdentityAPI.processResponse(response.data);
      
      if (result.success) {
        // Store auth token for next API calls
        setAuthToken(result.authToken);
        
        if (result.showPasswordInput && result.authToken) {
          // Navigate to Password Screen (login_type === "0")
          navigation.navigate('PasswordScreen', {
            userEmail: userInput,
            authToken: result.authToken,
            userDetails: result.userDetails,
          });
        } else if (result.showOtpInput) {
          // Show OTP input (login_type === "3")
          setShowOTP(true);
          setShowPassword(false);
        }
      } else {
        // Show error message from API
        showSnackbar(result.error || 'Validation failed');
      }
    } catch (error: any) {
      console.error('Validate Identity API error:', error);
      
      // Handle network or other errors
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Network error. Please try again.';
      showSnackbar(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };



  const handleNext = async () => {
    const type = validateInputType(inputValue);
    setInputType(type);
    
    if (type) {
      // Valid input - call Validate Identity API
      await callValidateIdentityAPI(inputValue);
    } else {
      // Invalid input - show snackbar as requested
      showSnackbar('Please provide a valid email or mobile number!');
    }
  };

  const handleLogin = () => {
    if (inputType === 'email' && password) {
      console.log('Email login:', { email: inputValue, password });
    } else if (inputType === 'phone' && otpValues.every(digit => digit !== '')) {
      console.log('Phone login:', { phone: inputValue, otp: otpValues.join('') });
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  const handleResendOTP = () => {
    console.log('Resend OTP pressed');
  };

  const isInputEditable = !showPassword && !showOTP;

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
          <Text style={styles.welcomeText}>Welcome to {'\n'} Channel Partner App
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
            {/* Email/Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone number/Email Address</Text>
              <View style={[styles.inputWrapper, !isInputEditable && styles.inputDisabled]}>
                <TextInput
                  style={[styles.textInput, !isInputEditable && styles.textInputDisabled]}
                  placeholder="annie@canon.com"
                  placeholderTextColor="#607A9F"
                  value={inputValue}
                  onChangeText={setInputValue}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={isInputEditable}
                />
              </View>
            </View>

            {/* Password Input - Conditionally Rendered */}
            {showPassword && (
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
            )}

            {/* OTP Input - Conditionally Rendered */}
            {showOTP && (
              <View style={styles.otpContainer}>
                <Text style={styles.inputLabel}>OTP</Text>
                <View style={styles.otpRow}>
                  {otpValues.map((value, index) => (
                    <TextInput
                      key={index}
                      style={[
                        styles.otpInput,
                        value ? styles.otpInputFilled : null,
                        index === 0 ? styles.otpInputActive : null
                      ]}
                      value={value}
                      onChangeText={(text) => handleOTPChange(index, text)}
                      keyboardType="numeric"
                      maxLength={1}
                      textAlign="center"
                    />
                  ))}
                </View>
                <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
                  <Text style={styles.resendButtonText}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Forgot Password - Only show with password */}
            {showPassword && (
              <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Next/Login Button */}
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              (!isNextEnabled && !showPassword && !showOTP) || isLoading ? styles.actionButtonDisabled : null
            ]} 
            onPress={showPassword || showOTP ? handleLogin : handleNext}
            disabled={(!isNextEnabled && !showPassword && !showOTP) || isLoading}
          >
            <Text style={[
              styles.actionButtonText,
              (!isNextEnabled && !showPassword && !showOTP) || isLoading ? styles.actionButtonTextDisabled : null
            ]}>
              {isLoading ? 'Validating...' : (showPassword || showOTP ? 'Login' : 'Next')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms Text */}
      </View>

      {/* Snackbar */}
      {snackbarVisible && (
        <Animated.View 
          style={[
            styles.snackbar,
            {
              opacity: snackbarOpacity,
            }
          ]}
        >
          <Text style={styles.snackbarText}>{snackbarMessage}</Text>
        </Animated.View>
      )}
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
    flex: 1,
    gap: 32,
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
    paddingHorizontal: 2,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#CFD7E2',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  inputDisabled: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E0E0E0',
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
  textInputDisabled: {
    color: '#8E8E93',
  },
  otpContainer: {
    gap: 12,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  otpInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#CFD7E2',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    color: '#041A2F',
  },
  otpInputFilled: {
    borderColor: '#508DFF',
    backgroundColor: '#FFFFFF',
  },
  otpInputActive: {
    borderColor: '#508DFF',
  },
  resendButton: {
    alignSelf: 'flex-end',
    paddingVertical: 12,
  },
  resendButtonText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: '#246EF6',
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
  actionButton: {
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
  actionButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  actionButtonText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  actionButtonTextDisabled: {
    color: '#8E8E93',
  },
  termsContainer: {
    marginTop: 'auto',
    paddingTop: 20,
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
  snackbar: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#323232',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  snackbarText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
}); 