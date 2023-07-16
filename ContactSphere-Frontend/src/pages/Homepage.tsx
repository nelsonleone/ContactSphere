import ContactItem from "../components/ContactFormContent/ContactItem"
import { useAppSelector } from "../customHooks/reduxCustomHooks"
import InPageLoader from '../../lib/loaders/InPageLoader'
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions"
import { memo, useEffect, useState } from "react"
import { ContactItemLocation } from "../enums"
import SortContacts from "../utils/helperFns/SortContacts"
import PageWrapper from "../components/PageWrapper"
import ContactPageTopColumn from "../components/ContactFormContent/ContactPageTopColumn"

interface IHomepageProps {
   fetchingContacts: boolean
}

function Homepage(props:IHomepageProps){

   const { contacts } = useAppSelector(store => store.userData)
   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const activeContacts = contacts.filter(c => !c.isHidden || !c.inTrash)

   return(
      !props.fetchingContacts ?
      <PageWrapper className="homepage" title="ContactSphere">
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions contactsForMultiSelect={contacts} />
            :
            <ContactPageTopColumn />
         }
         <p aria-label="Contacts Count" className="contact_count_para">Contacts ({activeContacts.length})</p>

         <main className="contacts_container">
            {
               contacts.length ? SortContacts(sortBy,activeContacts).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Homepage} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">You Have No Saved Contact</p>
               </div>
            }
         </main>
      </PageWrapper>
      :
      <InPageLoader />
   )
}

export default memo(Homepage)