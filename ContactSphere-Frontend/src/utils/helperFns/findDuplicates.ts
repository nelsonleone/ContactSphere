import { IContactsFromDB } from "../../vite-env";

export default function findDuplicates(contacts:IContactsFromDB[]){
  const helperArr: IContactsFromDB[] = []
  const activeContacts = contacts.filter(c => !c.isHidden && !c.inTrash)

  const sortedArray = activeContacts.sort((a,b) =>  a.firstName.toString().localeCompare(b.firstName.toString()))

  sortedArray.forEach((c,i) => {
    if(sortedArray.length > 1 && i !== sortedArray.length - 1){
      const obj1 = c;
      const obj2 = sortedArray[i + 1]
      
      if(obj1.firstName.toString() === obj2.firstName.toString() && obj1.phoneNumber === obj2.phoneNumber){
        helperArr.push(obj1,obj2)
      }
    }
  })

  return helperArr;
}