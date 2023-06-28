import ContactItem from "../components/ContactFormContent/ContactItem"
import { useAppSelector } from "../customHooks/reduxCustomHooks"
import InPageLoader from '../../lib/loaders/InPageLoader'

interface IHomepageProps {
   fetchingContacts: boolean
}

export default function Homepage(props:IHomepageProps){

   const { contacts } = useAppSelector(store => store.userData)

   return(
      !props.fetchingContacts ?
      <main className="page homepage">
         <div className="contacts_view_top_section">
            <ul>
               <li id="name-col">Name</li>
               <li id="email-col">Email</li>
               <li id="phone-col">Phone Number</li>
               <li id="jobTitle-col">Job Title</li>
            </ul>
         </div>
         <p aria-label="Contacts Count">{contacts.length}</p>

         <div className="contacts_container">
            {
               contacts.length ?
               contacts.map(contactProps => (
                  <ContactItem {...contactProps} />
               ))
               :
               null
            }
         </div>
      </main>
      :
      <InPageLoader />
   )
}