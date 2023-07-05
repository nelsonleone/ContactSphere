import { useEffect, useState } from "react";
import ContactItem from "../components/ContactFormContent/ContactItem";
import ContactsPageColumnOrder from "../components/ContactFormContent/ContactsPageColumnOrder";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import { ContactItemLocation, SortBy } from "../enums";
import SortContacts from "../utils/helperFns/SortContacts";

function Trash() {

   const { contacts } = useAppSelector(store => store.userData)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [sortType,setSortType] = useState(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   const [trashedContacts,setTrashedContacts] = useState(contacts.filter(contact => contact.isHidden === true))
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   useEffect(() => {
      setSortType(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   },[sortBy])

   useEffect(() => {
      setTrashedContacts(contacts.filter(contact => contact.inTrash === true))
   },[contacts.length])

   return (
      <div className="page trash">
         <p role="alert">Contacts Remain In Trash For 30days, after which they are automatically deleted permanently</p>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions />
            :
            <ContactsPageColumnOrder />
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Contacts ({contacts.length})</p>
         <main>
            {
               trashedContacts.length ? SortContacts(sortType,trashedContacts).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Trash} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">You Have No Contact In Trash</p>
               </div>
            }
         </main>
      </div>
   )
}

export default Trash;