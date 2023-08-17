export default function cleanDisplayName(displayName:string){
   if (displayName.startsWith('#')){
      const cleanedDisplayName = displayName.substring(1)
      return cleanedDisplayName;
   }
   return displayName
}