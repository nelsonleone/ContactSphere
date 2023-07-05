import { IContactsFromDB } from "../../vite-env";

export default function findDuplicates(contacts:IContactsFromDB[]){
   const helperArr: IContactsFromDB[] = []
   const sortedArray = contacts.sort((a,b) => {
     return a._id.toString().localeCompare(b._id.toString())
   })

   sortedArray.forEach((c,i) => {
     const arr1 = c;
     const arr2 = sortedArray[i + 1]

     if(arr1._id.toString() === arr2._id.toString()){
       helperArr.push(arr1,arr2)
     }
   })

   return helperArr;
}