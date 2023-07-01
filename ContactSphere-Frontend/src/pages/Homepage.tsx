import ContactItem from "../components/ContactFormContent/ContactItem"
import { useAppSelector } from "../customHooks/reduxCustomHooks"
import InPageLoader from '../../lib/loaders/InPageLoader'
import { FcContacts } from 'react-icons/fc'
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions"

interface IHomepageProps {
   fetchingContacts: boolean
}

export default function Homepage(props:IHomepageProps){

   const { contacts } = useAppSelector(store => store.userData)
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   return(
      !props.fetchingContacts ?
      <main className="page homepage">
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
         <p aria-label="Contacts Count">Contacts ({contacts.length})</p>

         <div className="contacts_container">
            {
               contacts.length ?
               contacts.map(contactProps => (
                  <ContactItem {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <FcContacts />
                  <p role="alert">You Have No Saved Contact</p>
               </div>
            }
         </div>
      </main>
      :
      <InPageLoader />
   )
}