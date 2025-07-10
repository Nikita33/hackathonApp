// Navigation types for React Navigation

export type RootStackParamList = {
  LoginScreen: undefined;
  PasswordScreen: {
    userEmail: string;
    authToken: string;
    userDetails?: any;
  };
  Home?: {
    authToken?: string;
    setCookieHeaders?: any;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 