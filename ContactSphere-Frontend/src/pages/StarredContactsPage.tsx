import { useEffect, useState } from "react";
import ContactItem from "../components/ContactFormContent/ContactItem";
import ContactsPageColumnOrder from "../components/ContactFormContent/ContactsPageColumnOrder";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import { ContactItemLocation } from "../enums";
import SortContacts from "../utils/helperFns/SortContacts";
import PageWrapper from "../components/PageWrapper";
import InPageLoader from "../../lib/loaders/InPageLoader";
import { IContactsFromDB } from "../vite-env";

function StarredContactsPage({fetchingContacts}: { fetchingContacts:boolean }) {

   const { contacts } = useAppSelector(store => store.userData)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [starredContacts,setStarredContacts] = useState<IContactsFromDB[]>(contacts.filter(contact => contact.inFavourites === true))
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   useEffect(() => {
      setStarredContacts(contacts.filter(contact => contact.inFavourites === true))
   },[contacts.length])


   return (
      !fetchingContacts ? 
      <PageWrapper className="favourites"  title="ContactSphere | Favourites">
         <div className="favourites_page_prompt">
            <h2 role="alert">If They Are Starred, Yes They Are Special.</h2>
         </div>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions contactsForMultiSelect={starredContacts} />
            :
            <ContactsPageColumnOrder />
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Favourites ({starredContacts.length})</p>
         <main className="contacts_container">
            {
               starredContacts.length ? SortContacts(sortBy,starredContacts).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Favourites} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">You Have No Starred Contacts</p>
               </div>
            }
         </main>
      </PageWrapper>
      :
      <InPageLoader />
   )
}

export default StarredContactsPage;