import { IContactsFromDB } from "../../vite-env";

export default function findDuplicates(contacts:IContactsFromDB[]){
  const helperArr: IContactsFromDB[] = []
  const localContacts = contacts.map(c => {
    return {...c,name: c.name || `${c.firstName} ${c.lastName}`}
  })

  const sortedArray = localContacts.sort((a,b) =>  a.name.toString().localeCompare(b.name.toString()))

  sortedArray.forEach((c,i) => {
    if(sortedArray.length > 1 && i !== sortedArray.length - 1){
      const obj1 = c;
      const obj2 = sortedArray[i + 1]
      
      if(obj1.name.toString() === obj2.name.toString() && obj1.phoneNumber === obj2.phoneNumber){
        helperArr.push(obj1,obj2)
      }
    }
  })

  return helperArr;
}