function cleanDisplayName(displayName){
   if (displayName.startsWith('#')){
      const cleanedDisplayName = displayName.substring(1)
      return cleanedDisplayName;
   }
   return displayName
}

module.exports = cleanDisplayName;