import { useEffect, useState } from "react";
import ContactItem from "../components/ContactFormContent/ContactItem";
import ContactsPageColumnOrder from "../components/ContactFormContent/ContactsPageColumnOrder";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import { ContactItemLocation, SortBy } from "../enums";
import SortContacts from "../utils/helperFns/SortContacts";
import PageWrapper from "../components/PageWrapper";
import InPageLoader from "../../lib/loaders/InPageLoader";

function StarredContactsPage({fetchingContacts}: { fetchingContacts:boolean }) {

   const { contacts } = useAppSelector(store => store.userData)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [sortType,setSortType] = useState(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   const starredContacts = contacts.filter(contact => contact.inFavourites === true)
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   useEffect(() => {
      setSortType(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   },[sortBy])

   return (
      fetchingContacts ? 
      <PageWrapper className="trash" desc="starred contacts" title="Favourites">
         <p role="alert">If They Are Starred, Yes They Are Special.</p>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions />
            :
            <ContactsPageColumnOrder />
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Favourites ({contacts.length})</p>
         <main>
            {
               starredContacts.length ? SortContacts(sortType,starredContacts).map(contactProps => (
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