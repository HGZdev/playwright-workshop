export const currencyFormatter = (
  amount: number,
  currency: Intl.NumberFormatOptions['currency'] = 'PLN',
  showSign: boolean = false,
) => {
  const operationSign = showSign ? (amount > 0 ? '+' : '') : '';
  return (
    operationSign +
    new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency,
    }).format(amount)
  );
};
