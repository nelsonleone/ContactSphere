const capitalizeString = (string) => {
  if (!string) {
    return string;
  }

  const words = string.trim().split(' ')
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.slice(0, 1).toUpperCase()
    const otherLetters = word.slice(1).toLowerCase()
    return `${firstLetter}${otherLetters}`;
  });

  return capitalizedWords.join(' ')
}
 
module.exports = capitalizeString;
 