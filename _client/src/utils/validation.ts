// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation - minimum 6 characters
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const getEmailError = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!isValidEmail(email)) return 'Please enter a valid email address';
  return null;
};

export const getPasswordError = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (!isValidPassword(password)) return 'Password must be at least 6 characters';
  return null;
};

export const getRecipientError = (recipient: string): string | null => {
  if (!recipient) return 'Recipient is required';
  return null;
};

export const getTitleError = (title: string): string | null => {
  if (!title) return 'Title is required';
  return null;
};

export const getAmountError = (amount: string): string | null => {
  if (!amount) return 'Amount is required';
  const numAmount = Number(amount);
  if (isNaN(numAmount)) return 'Amount must be a number';
  if (numAmount <= 0) return 'Amount must be positive';
  return null;
};
