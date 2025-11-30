export const currencyFormatter = (amount: number, showSign: boolean = false) => {
  const operationSign = showSign ? (amount > 0 ? '+' : '') : '';
  return (
    operationSign +
    new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(amount)
  );
};
