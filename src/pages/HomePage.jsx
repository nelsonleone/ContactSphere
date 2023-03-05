import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from "../redux/features/loadingSlice"
import { useLocation } from 'react-router-dom'
import AddNewContactBtn from "../components/AddNewContactBtn"
import NotLoggedIn from "../components/NotLoggedIn"
import ActiveContact from '../components/ActiveContact'
import { nanoid } from '@reduxjs/toolkit'
import { Snackbar } from "@mui/material";


export default function Homepage(){

   const { beenAuthenticated } = useSelector(store => store.userAuth)
   const { isLoading } = useSelector(store => store.loading)
   const { activeContacts, isFetching } = useSelector(store => store.contact.contactsData)
   const [addedToTrash,setAddedToTrash] = useState(false)
   const [hiddenContact,setAddedToHiddenContacts] = useState(false)
   const dispatch = useDispatch()
   const location = useLocation()
   const [showContacts,setShowContacts] = useState(false)

   useEffect(()=> {
      let timer;
      if(!isFetching){
         timer = setTimeout(() => {
            setShowContacts(true)
         }, 6000);
      }
   },[isFetching])

   useEffect(() => {
      let timer;
      if(hiddenContact){
         timer = setTimeout(() => {
            setAddedToHiddenContact(false)
         }, 5000)
      }
      return () => clearTimeout(timer)
   },[hiddenContact])

   useEffect(() => {
      let timer;
      if(addedToTrash){
         timer =  setTimeout(() => {
            setAddedToTrash(false)
         }, 5000)
      }
      return () => clearTimeout(timer)
   },[addedToTrash])

   return(
      <>
         {
            !isLoading && 
            <main className="main-content">
               <AddNewContactBtn />
               <div className="header_labels">
                  <h4 id="hidden-name-header">Name</h4>
                  <h4 id="hidden-email-header">Email</h4>
                  <h4 id="hidden-phoneNumber-header">Phone Number</h4>
                  <h4 id="hidden-work-header">Job Title/Company</h4>
               </div>
               <div>
                  {
                     !showContacts ?
                     <h2>Getting Your Contacts......</h2>
                     :
                     activeContacts.length && showContacts ? 
                        activeContacts.map(contactInfo => {
                           return(
                              <ActiveContact
                                 key={contactInfo.id}
                                 contactInfo={{...contactInfo}}
                                 setAddedToTrash={setAddedToTrash}
                                 setAddedToHiddenContacts={setAddedToHiddenContacts}
                              />
                           )
                        })
                        :
                     <h2>You Don't Have Any Saved Active Contact</h2>
                  }
               </div>
            </main>
         }
        {
            !beenAuthenticated && !isLoading &&
            <NotLoggedIn />
        }

        {/* notification snackbars */}
         <Snackbar
            open={addedToTrash}
            autoHideDuration={5000}
            onClose={() => setAddedToTrash(false)}
            message={"Contact Have Been Trashed"}
         />
         <Snackbar
            open={hiddenContact}
            autoHideDuration={5000}
            onClose={() => setAddedToHiddenContacts(false)}
            message={"Contact Hidden"}
         />
      </>
   )
}