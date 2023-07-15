import { useEffect, useState } from "react";
import ContactItem from "../components/ContactFormContent/ContactItem";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import { ContactItemLocation } from "../enums";
import SortContacts from "../utils/helperFns/SortContacts";
import PageWrapper from "../components/PageWrapper";
import InPageLoader from "../../lib/loaders/InPageLoader";

function Trash({fetchingContacts}: { fetchingContacts:boolean }) {

   const { contacts } = useAppSelector(store => store.userData)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [trashedContacts,setTrashedContacts] = useState(contacts.filter(contact => contact.isHidden === true))
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   useEffect(() => {
      setTrashedContacts(contacts.filter(contact => contact.inTrash === true))
   },[contacts.length])

   return (
      !fetchingContacts ? 
      <PageWrapper className="trash" title="ContactSphere | Trash">
         <div className="trash_page_prompt">
            <p role="alert">
               Contacts Remain In Trash For 30days, after which they are automatically deleted permanently.
            </p>
            <button>Empty Trash</button>
         </div>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions contactsForMultiSelect={trashedContacts} />
            :
            <div className="contacts_view_top_section">
               <ul>
                  <li id="name-col">Name</li>
                  <li id="email-col">Email</li>
                  <li id="phone-col">Phone Number</li>
                  <li id="deletedDate-col">Date Deleted</li>
               </ul>
            </div>
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Contacts ({contacts.length})</p>
         <main className="contacts_container">
            {
               trashedContacts.length ? SortContacts(sortBy,trashedContacts).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Trash} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">You Have No Contact In Trash</p>
               </div>
            }
         </main>
      </PageWrapper>
      :
      <InPageLoader />
   )
}

export default Trash;