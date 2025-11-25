interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
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
    return apiError.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
};
