const parseBalanceText = (text: string) => {
  return parseFloat(text?.replace(/[^\d,-]/g, '').replace(',', '.') || '0');
};

export default parseBalanceText;
