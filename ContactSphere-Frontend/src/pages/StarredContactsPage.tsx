import ContactItem from "../components/ContactFormContent/ContactItem";
import ContactsPageColumnOrder from "../components/ContactFormContent/ContactsPageColumnOrder";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import { useAppSelector } from "../customHooks/reduxCustomHooks";
import { ContactItemLocation } from "../enums";
import SortContacts from "../utils/helperFns/SortContacts";
import PageWrapper from "../components/PageWrapper";

function StarredContactsPage({fetchingContacts}: { fetchingContacts:boolean }) {

   const { contacts } = useAppSelector(store => store.userData)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const starredContacts = contacts.filter(contact => contact.inFavourites === true && !contact.inTrash && !contact.isHidden)
   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   return (
      <PageWrapper fetchingContacts={fetchingContacts} className="favourites"  title="ContactSphere | Favourites">
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions contactsForMultiSelect={starredContacts} />
            :
            <ContactsPageColumnOrder />
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Favourites ({starredContacts.length})</p>
         <main className="contacts_container">
            {
               starredContacts.length ? SortContacts(sortBy,starredContacts).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Favourites} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">You Have No Starred Contacts</p>
               </div>
            }
         </main>
      </PageWrapper>
   )
}

export default StarredContactsPage;