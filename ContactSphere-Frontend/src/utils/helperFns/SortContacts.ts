import { SortBy } from "../../enums";
import { IContactsFromDB } from "../../vite-env";

export default function SortContacts(sortType: SortBy, contacts: IContactsFromDB[]) {
   let sortedContacts = [...contacts]
 
   sortedContacts.sort((a, b) =>
      sortType === SortBy.FirstName
       ? a.firstName.localeCompare(b.firstName)
       : sortType === SortBy.LastName
       ? a.lastName.localeCompare(b.lastName)
       : b.createdAt.getTime() - a.createdAt.getTime()
   )
 
   return sortedContacts;
}
 