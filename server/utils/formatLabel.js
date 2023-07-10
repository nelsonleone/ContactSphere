const formatLabel = (val) => {
   const label = val.trim()
   const firstLetter = label.slice(0).toUppercase()
   const otherLetters = label.slice(1,-1).toLowercase()

   return `${firstLetter}${otherLetters}`.trim()
}

module.exports = formatLabel;