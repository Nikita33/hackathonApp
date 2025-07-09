import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed');
  };

  const handleAppleLogin = () => {
    // Handle Apple login
    console.log('Apple login pressed');
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log('Google login pressed');
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Forgot password pressed');
  };

  const handleJoinUs = () => {
    // Handle join us
    console.log('Join us pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Background decorative elements */}
          <View style={styles.bgElements}>
            <View style={[styles.bgCircle, styles.bgCircle1]}>
              <Image 
                source={require('../../assets/bg-image-1.png')} 
                style={styles.bgImage}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.bgCircle, styles.bgCircle2]}>
              <Image 
                source={require('../../assets/bg-image-2.png')} 
                style={styles.bgImage}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.bgCircle, styles.bgCircle3]}>
              <Image 
                source={require('../../assets/bg-image-3.png')} 
                style={styles.bgImage}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.bgCircle, styles.bgCircle4]}>
              <Image 
                source={require('../../assets/bg-image-4.png')} 
                style={styles.bgImage}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.bgCircle, styles.bgCircle5]}>
              <Image 
                source={require('../../assets/bg-image-5.png')} 
                style={styles.bgImage}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.bgCircle, styles.bgCircle6]}>
              <Image 
                source={require('../../assets/bg-image-6.png')} 
                style={styles.bgImage}
                resizeMode="cover"
              />
            </View>
          </View>
          
          {/* Logo/Brand */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.welcomeText}>Welcome Channel Partner</Text>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Login to Your Account</Text>
            <Text style={styles.subtitle}>
              Login to track your rewards, progress, and earnings.
            </Text>
          </View>

          <View style={styles.formSection}>
            {/* Social Login Buttons */}
            <View style={styles.socialLoginSection}>
              <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
                <Ionicons name="logo-apple" size={20} color="#041A2F" />
                <Text style={styles.socialButtonText}>Sign in with Apple</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
                <Ionicons name="logo-google" size={20} color="#041A2F" />
                <Text style={styles.socialButtonText}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or signin with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Form Fields */}
            <View style={styles.formFields}>
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Email Address</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Eg. rai@xoxoday.com"
                  placeholderTextColor="#607A9F"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="•••••••••"
                  placeholderTextColor="#607A9F"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Terms and Privacy */}
            <Text style={styles.termsText}>
              By signing in you agree with our Terms of Service and accept our Privacy Policy
            </Text>

            {/* Join Us Section */}
            <View style={styles.joinUsSection}>
              <Text style={styles.newHereText}>New here? </Text>
              <TouchableOpacity onPress={handleJoinUs}>
                <Text style={styles.joinUsText}>Join us to unlock rewards</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFD7E2',
  },
  header: {
    backgroundColor: '#CFD7E2',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    position: 'relative',
  },
  bgElements: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 180,
    opacity: 0.7,
  },
  bgCircle: {
    position: 'absolute',
    borderRadius: 46,
    opacity: 0.8,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  bgCircle1: {
    width: 29,
    height: 29,
    top: 130,
    right: 25,
  },
  bgCircle2: {
    width: 29,
    height: 29,
    top: 0,
    left: 194,
  },
  bgCircle3: {
    width: 36,
    height: 36,
    top: 111,
    left: 0,
  },
  bgCircle4: {
    width: 29,
    height: 29,
    top: 22,
    left: 23,
  },
  bgCircle5: {
    width: 36,
    height: 36,
    top: 41,
    right: 67,
  },
  bgCircle6: {
    width: 36,
    height: 36,
    top: 127,
    left: 151,
  },
  logoContainer: {
    marginBottom: 12,
  },
  logo: {
    width: 180,
    height: 45,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#041A2F',
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#ffffff',
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
  },
  titleSection: {
    marginBottom: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#041A2F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#394960',
    lineHeight: 18,
  },
  formSection: {
    gap: 20,
  },
  socialLoginSection: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#CFD7E2',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    gap: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#041A2F',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#CFD7E2',
  },
  dividerText: {
    fontSize: 12,
    color: '#273241',
    letterSpacing: 0.25,
  },
  formFields: {
    gap: 16,
  },
  fieldContainer: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#394960',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CFD7E2',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 14,
    color: '#041A2F',
    backgroundColor: '#ffffff',
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '500',
    color: '#246EF6',
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#246EF6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
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
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  termsText: {
    fontSize: 12,
    color: '#041A2F',
    lineHeight: 18,
    textAlign: 'center',
  },
  joinUsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  newHereText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  joinUsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#246EF6',
  },
});

export default LoginScreen; 