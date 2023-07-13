import { useEffect, useState } from "react";
import ContactItem from "../components/ContactFormContent/ContactItem";
import ContactsPageColumnOrder from "../components/ContactFormContent/ContactsPageColumnOrder";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import { ContactItemLocation, SortBy } from "../enums";
import SortContacts from "../utils/helperFns/SortContacts";
import InPageLoader from "../../lib/loaders/InPageLoader";
import PageWrapper from "../components/PageWrapper";

function Duplicates({fetchingContacts}: {fetchingContacts:boolean}) {

   const duplicates = useAppSelector(store => store.resolveDuplicates)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const { selectedContacts } = useAppSelector(store => store.multiSelect)


   return (
      !fetchingContacts ?
      <PageWrapper className="duplicates" title="Duplicates">
         <div className="duplicates_page_prompt">
          <p role="alert">Ensure to resolve the duplicates in your saved contacts, to enhance quality user experience</p>
         </div>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions contactsForMultiSelect={duplicates}/>
            :
            <ContactsPageColumnOrder />
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Duplicates ({duplicates.length})</p>
         <main>
            {
               duplicates.length ? SortContacts(sortBy,duplicates).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Trash} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">No Duplicates Found</p>
               </div>
            }
         </main>
      </PageWrapper>
      :
      <InPageLoader />
   )
}

export default Duplicates;