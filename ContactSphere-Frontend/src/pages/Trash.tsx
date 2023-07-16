import { useEffect, useState } from "react";
import ContactItem from "../components/ContactFormContent/ContactItem";
import MultiSelectActions from "../components/ContactFormContent/MultiSelectActions";
import { useAppDispatch, useAppSelector } from "../customHooks/reduxCustomHooks";
import { ContactItemLocation } from "../enums";
import SortContacts from "../utils/helperFns/SortContacts";
import PageWrapper from "../components/PageWrapper";
import InPageLoader from "../../lib/loaders/InPageLoader";
import CustomSimpleDialog from '../../lib/popups/CustomSimpleDialog'
import clientAsyncHandler from "../utils/helperFns/clientAsyncHandler";
import stopUnauthourizedActions from "../utils/helperFns/stopUnauthourizedActions";
import { useSendMultipleToTrashMutation, useTrashContactMutation } from "../RTK/features/injectedContactsApiQueries";
import handleAsyncPermanentDelete from "../utils/helperFns/handleAsyncPermanentDelete";

function Trash({fetchingContacts}: { fetchingContacts:boolean }) {

   const { contacts } = useAppSelector(store => store.userData)
   const { sortBy } = useAppSelector(store => store.userLocalSetting)
   const trashedContacts = contacts.filter(contact => contact.isHidden === true)
   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const [showDialog,setShowDialog] = useState(false)
   const dispatch = useAppDispatch()
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const [deleteContact] = useTrashContactMutation()
   const [deleteMultiple] = useSendMultipleToTrashMutation()

   const handleEmptyTrash = () => clientAsyncHandler(
      async() => {
         setShowDialog(false)
         await stopUnauthourizedActions(uid)
         await handleAsyncPermanentDelete(
            deleteContact,
            deleteMultiple,
            "",
            uid!,
            "multi",
            dispatch,
            contacts,
            selectedContacts
         )
      },
      dispatch
   )

   return (
      !fetchingContacts ? 
      <PageWrapper className="trash" title="ContactSphere | Trash">
         <div className="trash_page_prompt">
            <p role="alert">
               Contacts Remain In Trash For 30days, after which they are automatically deleted permanently.
            </p>
            <button onClick={() => setShowDialog(true)}>Empty Trash</button>
         </div>
         {
            selectedContacts.length > 0 ?
            <MultiSelectActions contactsForMultiSelect={trashedContacts} />
            :
            <div className="contacts_view_top_section">
               <ul>
                  <li id="name-col">Name</li>
                  <li id="email-col">Email</li>
                  <li id="phone-col">Phone Number</li>
                  <li id="deletedDate-col">Date Deleted</li>
               </ul>
            </div>
         }
         <p aria-label="Hidden Contacts Count" className="contact_count_para">Contacts ({contacts.length})</p>
         <main className="contacts_container">
            {
               trashedContacts.length ? SortContacts(sortBy,trashedContacts).map(contactProps => (
                  <ContactItem key={contactProps._id} location={ContactItemLocation.Trash} {...contactProps} />
               ))
               :
               <div className="nsc_content">
                  <p role="alert">You Have No Contact In Trash</p>
               </div>
            }
         </main>

         <CustomSimpleDialog  
            dialogTitle="Permanent Action" 
            dialogText="This will empty your trash, permanently delete all the contacts in it." 
            open={showDialog} 
            setOpen={setShowDialog} 
            action={handleEmptyTrash}
         />
      </PageWrapper>
      :
      <InPageLoader />
   )
}

export default Trash;