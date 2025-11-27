interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  message?: string;
}

/**
 * Extracts error message from API error response
 * @param error - The error object from API call
 * @param defaultMessage - Default message if no specific error message found
 * @returns Extracted or default error message
 */
export const extractErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as ApiError;
    // Try to get message from response.data.message or response.data.error
    const errorMessage = apiError.response?.data?.message || apiError.response?.data?.error;
    if (errorMessage) {
      return errorMessage;
    }
  }

  // Handle network errors
  if (error && typeof error === 'object' && 'message' in error) {
    const err = error as ApiError;
    if (err.message?.includes('Network Error') || err.message?.includes('timeout')) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }
  }

  return defaultMessage;
};
