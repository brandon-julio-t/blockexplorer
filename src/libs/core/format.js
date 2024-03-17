/**
 * @param {Number} number
 */
export const formatThousandSeparator = number => {
  const formatter = new Intl.NumberFormat('en-US');
  const formattedNumber = formatter.format(number);
  return formattedNumber;
};
