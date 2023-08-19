import { nanoid } from "@reduxjs/toolkit";
import { IContactsFromDB, Duplicate } from "../../vite-env";

export default function findDuplicates(contacts:IContactsFromDB[]){
  const helperArr : Duplicate[] = []
  const activeContacts = contacts.filter(c => !c.isHidden && !c.inTrash)

  const sortedArray = activeContacts.sort((a,b) =>  a.firstName.toString().localeCompare(b.firstName.toString()))

  sortedArray.forEach((c,i) => {
    if(sortedArray.length > 1 && i !== sortedArray.length - 1){
      const obj1 = c;
      const obj2 = sortedArray[i + 1]
      
      if(obj1.firstName.match(obj2.firstName) && obj1.phoneNumber === obj2.phoneNumber){
        helperArr.push({...obj1,mergeRef:""},{...obj2,mergeRef:""})
      }
    }
  })

  let duplicates;

  for(const dupProp of helperArr){
    const { phoneNumber } = dupProp;
    const mergeRef = `mgrf-${nanoid()}`

    duplicates = helperArr.map(val => {
      return {...val,mergeRef: val.phoneNumber === phoneNumber ? mergeRef : val.mergeRef}
    })
  }

  return duplicates;
}