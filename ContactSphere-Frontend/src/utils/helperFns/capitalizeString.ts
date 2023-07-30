export default function capitalizeString(val:string){
   // return value if it's an empty string, undefined or null
   if (!val) {
      return val;
   }

   const words = val.trim().split(' ')
   
   const capitalizedWords = words.map((word) => {
      const firstLetter = word.slice(0, 1).toUpperCase()
      const otherLetters = word.slice(1).toLowerCase()
      return `${firstLetter}${otherLetters}`;
   })

   return capitalizedWords.join(' ')
}