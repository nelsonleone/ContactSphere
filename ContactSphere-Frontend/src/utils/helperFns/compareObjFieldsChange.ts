export default function hasObjectChanged(obj1:object, obj2:object) {
   for (let key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
         const value1 = obj1[key as keyof object]
         const value2 = obj2[key as keyof object]
   
         if (Array.isArray(value1) && Array.isArray(value2)) {
            if (!arraysAreEqual(value1, value2)) {
               return true; // Array values have changed
            }
         } 
         else if (typeof value1 === 'object' && typeof value2 === 'object') {
            if (hasObjectChanged(value1, value2)) {
               return true; // Nested object values have changed
            }
         } 
         else if (value1 !== value2) {
            return true; // Property value has changed
         }
      }
   }
   return false; // No property value has changed
}


// Check If Arrays Are Equal
export function arraysAreEqual(arr1:any[], arr2:any[]) {
   if (arr1.length !== arr2.length) {
      return false;
   }

   for (let i = 0; i < arr1.length; i++) {
      // Fields In Array Are Objects
      if (hasObjectChanged(arr1[i],arr2[i])) {
         return true;
      }else{
         return false;
      }
   }

   return true;
}
 