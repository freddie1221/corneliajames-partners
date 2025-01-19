export function convertStringToNumber(amountStr) {
  
  // Use a regular expression to extract the numeric part of the string
  const matched = amountStr.match(/[\d,.]+/);
  if (matched) {
      
    // Replace any commas and parse the number
      const number = parseFloat(matched[0].replace(/,/g, ''));
    
    // Return the number rounded to two decimal places
      return Math.round(number * 100) / 100;
  } else {
      
    // Handle cases where no numeric value is found
      throw new Error('Invalid input string');
  }
}