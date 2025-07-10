// API Configuration based on Postman Collection
// Validate Identity API from Compass collection

export const API_CONFIG = {
  // Endpoint from Postman collection
  VALIDATE_IDENTITY_ENDPOINT: 'https://staging.getcompass.ai/chef/api/public/validateUserIdentity',
  VALIDATE_PASSWORD_ENDPOINT: 'https://staging.getcompass.ai/chef/api/public/validatePassword',
  
  // Headers from Postman collection (with pltfm: "10" as per pre-request script)
  HEADERS: {
    'Content-Type': 'application/json',
    'sec-ch-ua-platform': '"macOS"',
    'a_t': '',
    'Referer': '',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'lng': 'en',
    'sec-ch-ua-mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'pltfm': '10', // CRITICAL: Pre-request script says "Make sure when the Validate Password API is called, send the header pltfm === 10"
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
};

// Request/Response interfaces based on Postman collection
export interface ValidateIdentityRequest {
  variables: {
    user_input: string;
  };
}

export interface ValidateIdentityResponse {
  data: {
    validateUserIdentity: {
      success: number;
      errcode: string;
      error: string;
      error_msg: string | null;
      errcode_message_id: string | null;
      error_message_id: string;
      errcode_message_id_required_params: any;
      user_details: {
        first_name: string;
        user_login_type: string;
        company_data: any;
        steps_completed: any;
        route: any;
      };
      auth_token: string;
    };
  };
}

// Validate Password API interfaces
export interface ValidatePasswordRequest {
  variables: {
    password: string;
  };
}

export interface ValidatePasswordResponse {
  data: {
    validatePassword: {
      success: number;
      errcode: string;
      error: string;
      error_msg: string | null;
      errcode_message_id: string | null;
      error_message_id: string;
      errcode_message_id_required_params: any;
      // Note: Pre-request script says "there is not auth token in response just validate for success"
      // So no auth_token field in validatePassword response
    };
  };
}

// API Helper Functions
export const validateIdentityAPI = {
  // Create request body as per Postman collection
  createRequest: (userInput: string): ValidateIdentityRequest => {
    return {
      variables: {
        user_input: userInput
      }
    };
  },
  
  // Process response according to pre-request script logic
  processResponse: (response: ValidateIdentityResponse) => {
    // Follow the exact path: data.data.validateUserIdentity (as per pre-request script)
    const validateUserIdentity = response.data.validateUserIdentity;
    
    if (validateUserIdentity.success === 0) {
      // Error case
      return {
        success: false,
        error: validateUserIdentity.error_msg || 'Validation failed',
        showPasswordInput: false,
        showOtpInput: false,
        authToken: null,
      };
    } else if (validateUserIdentity.success === 1) {
      // Success case
      const userLoginType = validateUserIdentity.user_details.user_login_type;
      const authToken = validateUserIdentity.auth_token;
      
      if (userLoginType === "0") {
        // Show password input page
        return {
          success: true,
          error: null,
          showPasswordInput: true,
          showOtpInput: false,
          authToken: authToken,
          userDetails: validateUserIdentity.user_details,
        };
      } else if (userLoginType === "3") {
        // Show OTP input page
        return {
          success: true,
          error: null,
          showPasswordInput: false,
          showOtpInput: true,
          authToken: authToken,
          userDetails: validateUserIdentity.user_details,
        };
      } else {
        // Handle unexpected login_type cases
        return {
          success: false,
          error: 'Unexpected login type. Please contact support.',
          showPasswordInput: false,
          showOtpInput: false,
          authToken: null,
        };
      }
    } else {
      // Unexpected success value
      return {
        success: false,
        error: 'Unexpected response format.',
        showPasswordInput: false,
        showOtpInput: false,
        authToken: null,
      };
    }
  },
};

// Validate Password API Helper Functions
export const validatePasswordAPI = {
  // Create request body as per Postman collection with base64 encoded password
  createRequest: (password: string): ValidatePasswordRequest => {
    // CRITICAL: Pre-request script says "For encoding password use btoa"
    // Example: "Test@123" becomes "VGVzdEAxMjM=" (base64 encoded)
    const encodedPassword = btoa(password);
    return {
      variables: {
        password: encodedPassword
      }
    };
  },
  
  // Process response according to exact pre-request script logic
  processResponse: (response: ValidatePasswordResponse, fullResponse?: any) => {
    // Follow the exact path: data.data.validatePassword (as per pre-request script)
    const validatePassword = response.data.validatePassword;
    
    if (validatePassword.success === 0) {
      // Error case - Invalid password (exact logic from pre-request script)
      // "If success === 0 inside validatePassword in data → Show error: 'Invalid Password' → Stay on the same page"
      return {
        success: false,
        error: 'Invalid Password', // Exact error message from pre-request script
        setCookieHeaders: null,
      };
    } else if (validatePassword.success === 1) {
      // Success case - Login successful (exact logic from pre-request script)
      // "If success === 1 inside validatePassword in data → Login successful → Store the response.request.responseheaders.Set-Cookie → Redirect the user to the Home page"
      // Note: Pre-request script says "there is not auth token in response just validate for success, if 1 then move forward"
      
      // Extract Set-Cookie headers as specified in pre-request script
      const setCookieHeaders = fullResponse?.headers?.['set-cookie'] || fullResponse?.headers?.['Set-Cookie'] || null;
      
      return {
        success: true,
        error: null,
        setCookieHeaders: setCookieHeaders, // Store Set-Cookie headers for next APIs as per pre-request script
      };
    } else {
      // Unexpected success value
      return {
        success: false,
        error: 'Unexpected response format.',
        setCookieHeaders: null,
      };
    }
  },
}; 