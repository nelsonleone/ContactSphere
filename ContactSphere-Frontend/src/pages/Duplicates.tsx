import { useEffect, useState } from "react";
import ContactItem from "../components/ContactFormContent/ContactItem";
import ContactsPageColumnOrder from "../components/ContactFormContent/ContactsPageColumnOrder";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import { ContactItemLocation, SortBy } from "../enums";
import SortContacts from "../utils/helperFns/SortContacts";

function Duplicates() {

   const duplicates = useAppSelector(store => store.resolveDuplicates)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [sortType,setSortType] = useState(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   const [localDuplicates,setLocalDuplicates] = useState(duplicates.filter(contact => contact.isHidden === true))
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   useEffect(() => {
      setSortType(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   },[sortBy])

   useEffect(() => {
      setLocalDuplicates(duplicates.filter(contact => contact.inTrash === true))
   },[duplicates.length])

   return (
      <PageWrapper className="page trash_page" title="Duplicates">
         <p role="alert">Ensure to resolve the duplicates in your saved contacts, to enhance quality user experience</p>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions />
            :
            <ContactsPageColumnOrder />
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Duplicates ({localDuplicates.length})</p>
         <main>
            {
               localDuplicates.length ? SortContacts(sortType,duplicates).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Trash} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">No Duplicates Found</p>
               </div>
            }
         </main>
      </PageWrapper>
   )
}

export default Duplicates;