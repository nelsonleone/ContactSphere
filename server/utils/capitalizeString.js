const capitalizeString = (string) => {
   if(!string){
      return string;
   }

   const val = string.trim()
   const firstLetter = val.slice(0,1).toUpperCase()
   const otherLetters = val.slice(1,val.length).toLowerCase()

   return`${firstLetter}${otherLetters}`.trim()
}

module.exports = capitalizeString;