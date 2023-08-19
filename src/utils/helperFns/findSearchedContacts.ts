import { IContactsFromDB } from "../../vite-env";

const findSearchedContacts = (contacts:IContactsFromDB[],searchValue:string) => {
   const resultingContacts = contacts.filter(contact => {
      const lowercaseSearchValue = searchValue.toLowerCase()
      return (
        contact.firstName.toLowerCase().includes(lowercaseSearchValue) ||
        contact.lastName.toLowerCase().includes(lowercaseSearchValue) ||
        contact.middleName.toLowerCase().includes(lowercaseSearchValue) ||
        contact.nickname.toLowerCase().includes(lowercaseSearchValue) ||
        contact.phoneNumber.toLowerCase().includes(lowercaseSearchValue) ||
        contact.jobTitle.toLowerCase().includes(lowercaseSearchValue)
      )
   })

   return resultingContacts;
}

export default findSearchedContacts;