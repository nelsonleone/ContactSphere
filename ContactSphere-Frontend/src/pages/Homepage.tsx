import ContactItem from "../components/ContactFormContent/ContactItem"
import { useAppSelector } from "../customHooks/reduxCustomHooks"
import InPageLoader from '../../lib/loaders/InPageLoader'
import { FcContacts } from 'react-icons/fc'
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions"
import { memo, useEffect, useState } from "react"
import { ContactItemLocation, SortBy } from "../enums"
import SortContacts from "../utils/helperFns/SortContacts"
import PageWrapper from "../components/PageWrapper"

interface IHomepageProps {
   fetchingContacts: boolean
}

function Homepage(props:IHomepageProps){

   const { contacts } = useAppSelector(store => store.userData)
   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [sortType,setSortType] = useState<SortBy>(sortBy)

   useEffect(() => {
      setSortType(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   },[sortBy])

   return(
      !props.fetchingContacts ?
      <PageWrapper className="homepage" desc="View Your Saved Contacts" title="ContactSphere">
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions />
            :
            <div className="contacts_view_top_section">
               <ul>
                  <li id="name-col">Name</li>
                  <li id="email-col">Email</li>
                  <li id="phone-col">Phone Number</li>
                  <li id="jobTitle-col">Job Title</li>
               </ul>
            </div>
         }
         <p aria-label="Contacts Count" className="contact_count_para">Contacts ({contacts.length})</p>

         <main className="contacts_container">
            {
               contacts.length ? SortContacts(sortType,contacts).map(contactProps => (
                  !contactProps.inTrash && !contactProps.isHidden ?
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Homepage} {...contactProps} />
                  :
                  null
               ))
               :
               <div className="nsc_content">
                  <FcContacts />
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