import ContactItem from "../components/ContactFormContent/ContactItem";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import SortContacts from "../utils/helperFns/SortContacts";
import { ContactItemLocation } from "../enums";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import ContactsPageColumnOrder from "../components/ContactFormContent/ContactsPageColumnOrder";
import PageWrapper from "../components/PageWrapper";
import InPageLoader from "../../lib/loaders/InPageLoader";

function HiddenContacts({fetchingContacts}: { fetchingContacts:boolean }){

   const { contacts } = useAppSelector(store => store.userData)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const hiddenContacts = contacts.filter(contact => contact.isHidden === true)
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   return (
      !fetchingContacts ? 
      <PageWrapper className="hidden_contacts_page" title="ContactSphere | Hidden Contacts">
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions contactsForMultiSelect={hiddenContacts} />
            :
            <ContactsPageColumnOrder />
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Hidden ({hiddenContacts.length})</p>
         <main className="contacts_container">
            {
               hiddenContacts.length ? SortContacts(sortBy,hiddenContacts).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.HiddenContacts} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">You Have No Hidden Contact</p>
               </div>
            }
         </main>
      </PageWrapper>
      :
      <InPageLoader />
   )
}

export default HiddenContacts;