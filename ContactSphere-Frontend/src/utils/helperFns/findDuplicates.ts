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
        helperArr.push(
          {
            name: obj1.name,
            _id: obj1._id,
            phoneNumber: obj1.phoneNumber,
            firstName: obj1.firstName,
            lastName: obj1.lastName,
            repPhoto: obj1.repPhoto,
            mergeRef: ""
          },
          {
            name: obj2.name,
            _id: obj2._id,
            phoneNumber: obj2.phoneNumber,
            firstName: obj2.firstName,
            lastName: obj2.lastName,
            repPhoto: obj2.repPhoto,
            mergeRef: ""
          },
        )
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