import { useParams } from 'react-router-dom'
import { useAppSelector } from '../customHooks/reduxCustomHooks'
import PageWrapper from '../components/PageWrapper'
import MultiSelectActions from '../components/ContactFormContent/MultiSelectActions'
import ContactPageTopColumn from '../components/ContactFormContent/ContactPageTopColumn'
import SortContacts from '../utils/helperFns/SortContacts'
import ContactItem from '../components/ContactFormContent/ContactItem'
import { ContactItemLocation } from '../enums'
import { useEffect} from 'react'
import InPageLoader from '../../lib/loaders/InPageLoader'

export default function LabelPage({fetchingContacts}: { fetchingContacts:boolean }){

   const { id } = useParams()
   const { contacts, labels } = useAppSelector(store => store.userData)
   const {selectedContacts} = useAppSelector(store => store.multiSelect)
   const labelId = id ? id.toString() :"";
   const labelBeingPreviewed = labels.find(label => label._id.toString() === labelId)?.label;
   const contactsWithLabel = contacts.filter(contact => contact.labelledBy.some(val => val.label === labelBeingPreviewed))
   const { sortBy } = useAppSelector(store => store.userLocalSetting)

   return(
      !fetchingContacts ?
      <PageWrapper className="labels_page" title={`Labels - ${labelBeingPreviewed}`}>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions contactsForMultiSelect={contactsWithLabel}  />
            :
            <ContactPageTopColumn />
         }
         <p aria-label="Contacts Count" className="contact_count_para">{labelBeingPreviewed} ({contactsWithLabel.length})</p>

         <main className="contacts_container">
            {
               contactsWithLabel.length ? SortContacts(sortBy,contactsWithLabel).map(contactProps => (
                  !contactProps.inTrash && !contactProps.isHidden ?
                  <ContactItem key={contactProps._id} location={ContactItemLocation.LabelsPage} {...contactProps} />
                  :
                  null
               ))
               :
               <div className="nsc_content">
                  <p role="alert">No Contact With  {labelBeingPreviewed && <span style={{color:'hsl(182, 87%, 27%)'}}>{labelBeingPreviewed.toUpperCase()}</span>}  label</p>
               </div>
            }
         </main>
      </PageWrapper>
      :
      <InPageLoader />
   )
}