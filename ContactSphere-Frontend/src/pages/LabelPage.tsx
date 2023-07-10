import { useParams } from 'react-router-dom'
import { useAppSelector } from '../customHooks/reduxCustomHooks'
import PageWrapper from '../components/PageWrapper'
import MultiSelectActions from '../components/ContactFormContent/MultiSelectActions'
import ContactPageTopColumn from '../components/ContactFormContent/ContactPageTopColumn'
import SortContacts from '../utils/helperFns/SortContacts'
import ContactItem from '../components/ContactFormContent/ContactItem'
import { ContactItemLocation, SortBy } from '../enums'
import { useState, useEffect} from 'react'
import InPageLoader from '../../lib/loaders/InPageLoader'

export default function LabelPage({fetchingContacts}: { fetchingContacts:boolean }){

   const { id } = useParams()
   const { contacts, labels } = useAppSelector(store => store.userData)
   const {selectedContacts} = useAppSelector(store => store.multiSelect)
   const labelId = id ? id.toString() :"";
   const labelBeingPreviewed = labels.find(label => label._id.toString() === labelId)?.label;
   const contactsWithLabel = contacts.filter(contact => contact.labelledBy.some(val => val.label === labelBeingPreviewed))
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const [sortType,setSortType] = useState<SortBy>(sortBy)

   useEffect(() => {
      setSortType(localStorage.getItem('sortBy') ? localStorage.getItem('sortBy') as SortBy : sortBy)
   },[sortBy])

   return(
      fetchingContacts ?
      <PageWrapper className="homepage" desc={`Check out your contacts with the ${labelBeingPreviewed} label`} title={`Labels - ${labelBeingPreviewed}`}>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions />
            :
            <ContactPageTopColumn />
         }
         <p aria-label="Contacts Count" className="contact_count_para">{labelBeingPreviewed} ({contacts.length})</p>

         <main className="contacts_container">
            {
               contactsWithLabel.length ? SortContacts(sortType,contacts).map(contactProps => (
                  !contactProps.inTrash && !contactProps.isHidden ?
                  <ContactItem key={contactProps._id} location={ContactItemLocation.LabelsPage} {...contactProps} />
                  :
                  null
               ))
               :
               <div className="nsc_content">
                  <p role="alert">No Contact With Label</p>
               </div>
            }
         </main>
      </PageWrapper>
      :
      <InPageLoader />
   )
}