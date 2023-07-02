import { SortBy } from "../../enums";
import { IContactsFromDB } from "../../vite-env";

export default function SortContacts(sort:SortBy,contacts:IContactsFromDB[]){
   return contacts.sort((a,b) => (
      // Sort By FirstName
      sort === SortBy.FirstName ? a.firstName.localeCompare(b.firstName) :
      // Sort By LastName
      sort === SortBy.LastName ? a.lastName.localeCompare(b.lastName)  :
      // Sort By Creation Date
      b.createdAt.getTime() - a.createdAt.getTime()
   ))
}