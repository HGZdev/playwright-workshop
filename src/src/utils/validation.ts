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
  if (!email) return 'E-mail jest wymagany';
  if (!isValidEmail(email)) return 'Wprowadź poprawny adres e-mail';
  return null;
};

export const getPasswordError = (password: string): string | null => {
  if (!password) return 'Hasło jest wymagane';
  if (!isValidPassword(password)) return 'Hasło musi mieć co najmniej 6 znaków';
  return null;
};

export const getRecipientError = (recipient: string): string | null => {
  if (!recipient) return 'Odbiorca jest wymagany';
  return null;
};

export const getTitleError = (title: string): string | null => {
  if (!title) return 'Tytuł jest wymagany';
  return null;
};

export const getAmountError = (amount: string): string | null => {
  if (!amount) return 'Kwota jest wymagana';
  const numAmount = Number(amount);
  if (isNaN(numAmount)) return 'Kwota musi być liczbą';
  if (numAmount <= 0) return 'Kwota musi być dodatnia';
  return null;
};
