export function numInCurrency(
  loc: string,
  currency: string,
  style: string,
  number: number
) {
  return Intl.NumberFormat(loc, {
    style: style,
    currency: currency,
  }).format(number);
}