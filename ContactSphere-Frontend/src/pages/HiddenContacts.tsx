import { FcContacts } from "react-icons/fc";
import ContactItem from "../components/ContactFormContent/ContactItem";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import SortContacts from "../utils/helperFns/SortContacts";
import { useEffect, useState } from "react";
import { ContactItemLocation, SortBy } from "../enums";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import ContactsPageColumnOrder from "../components/ContactFormContent/ContactsPageColumnOrder";

function HiddenContacts() {

   const { contacts } = useAppSelector(store => store.userData)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [sortType,setSortType] = useState(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   const [hiddenContacts,setHiddenContacts] = useState(contacts.filter(contact => contact.isHidden === true))
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   useEffect(() => {
      setSortType(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   },[sortBy])

   useEffect(() => {
      setHiddenContacts(contacts.filter(contact => contact.isHidden === true))
   },[contacts.length])

   return (
      <div className="page hidden_contacts_page">
         <h2>Hidden Contacts</h2>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions />
            :
            <ContactsPageColumnOrder />
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Contacts ({contacts.length})</p>
         <main>
            {
               hiddenContacts.length ? SortContacts(sortType,hiddenContacts).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.HiddenContacts} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <FcContacts />
                  <p role="alert">You Have No Hidden Contact</p>
               </div>
            }
         </main>
      </div>
   )
}

export default HiddenContacts;