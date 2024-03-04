export function currencyFormat(
  locale: string | string[] | undefined,
  options: Intl.NumberFormatOptions,
  number: number | bigint
) {
  return Intl.NumberFormat(locale, options).format(number);
}