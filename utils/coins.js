export const convertToLargeString = (number) => {
  // Convert the number to a string if it's not already
  let numStr = number.toString();

  if (numStr.length <= 8) {
      // Pad the number with leading zeros to ensure it's 8 digits long
      let paddedStr = numStr.padStart(8, '0');
      // Insert the decimal point after the first zero
      return '0.' + paddedStr;
  } else {
      // If the number is longer than 10 digits, handle it by placing the decimal point after 8 digits
      let integerPart = numStr.slice(0, numStr.length - 8);
      let fractionalPart = numStr.slice(-8);
      return integerPart + '.' + fractionalPart;
  }
};

export const convertToLargeString_10 = (number) => {
  // Convert the number to a string if it's not already
  let numStr = number.toString();

  if (numStr.length <= 10) {
      // Pad the number with leading zeros to ensure it's 8 digits long
      let paddedStr = numStr.padStart(10, '0');
      // Insert the decimal point after the first zero
      return '0.' + paddedStr;
  } else {
      // If the number is longer than 10 digits, handle it by placing the decimal point after 8 digits
      let integerPart = numStr.slice(0, numStr.length - 10);
      let fractionalPart = numStr.slice(-10);
      return integerPart + '.' + fractionalPart;
  }
};
