export default function cleanContactFormFields(val:string){
   // return value if it's an empty string, undefined or null
   if(!val){
      return val;
   }

   const fieldValue = val.trim()
   const firstLetter = fieldValue.slice(0,1).toUpperCase()
   const otherLetters = fieldValue.slice(1,fieldValue.length).toUpperCase()
   return `${firstLetter}${otherLetters}`.trim()
}