/**
 * Centralized error messages for user-friendly error handling
 * All messages are designed to be clear, actionable, and helpful for end users
 */

export const ErrorMessages = {
  // Authentication Errors
  AUTH: {
    INVALID_CREDENTIALS: 'The email or password you entered is incorrect. Please try again.',
    EMAIL_ALREADY_EXISTS:
      'An account with this email already exists. Please use a different email or try logging in.',
    LOGIN_FAILED:
      "We're having trouble logging you in. Please check your credentials and try again.",
    REGISTRATION_FAILED:
      "We couldn't create your account at this time. Please try again in a moment.",
    SESSION_EXPIRED: 'Your session has expired or is invalid. Please log in again.',
    LOGIN_REQUIRED: 'You need to be logged in to access this page. Please log in and try again.',
    INVALID_TOKEN: 'Your session has expired or is invalid. Please log in again.',
  },

  // Authorization Errors
  AUTHORIZATION: {
    AUTHENTICATION_REQUIRED: 'You need to be logged in to access this page.',
    ADMIN_ACCESS_REQUIRED:
      "You don't have permission to access this page. This area is restricted to administrators.",
    INSUFFICIENT_PERMISSIONS: "You don't have permission to perform this action.",
  },

  // Account & Transaction Errors
  ACCOUNT: {
    NOT_FOUND: "We couldn't find your account. Please try refreshing the page.",
    LOAD_FAILED:
      "We couldn't load your account details. Please refresh the page or try again later.",
    INVALID_AMOUNT: 'Please enter a valid amount greater than zero.',
    INSUFFICIENT_FUNDS:
      "You don't have enough funds to complete this transaction. Please check your balance.",
    TRANSACTION_FAILED: "We couldn't process your transaction. Please try again in a moment.",
  },

  // User Management Errors
  USER: {
    NOT_FOUND: "The user you're looking for doesn't exist or has been deleted.",
    UPDATE_FAILED: "We couldn't update the user information. Please try again.",
    DELETE_FAILED: "We couldn't delete the user. Please try again.",
    FETCH_FAILED: "We couldn't load the user list. Please refresh the page or try again later.",
  },

  // Generic Server Errors
  SERVER: {
    INTERNAL_ERROR: "We're experiencing technical difficulties. Please try again in a moment.",
    REQUEST_FAILED: "We're having trouble processing your request. Please try again in a moment.",
    NETWORK_ERROR:
      'Unable to connect to the server. Please check your internet connection and try again.',
  },

  // Validation Errors
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    INVALID_PASSWORD: 'Password must be at least 6 characters long.',
    INVALID_FORMAT: 'Please check the format of your input.',
  },
} as const;
