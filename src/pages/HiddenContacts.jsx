import HiddenContactItem from "../components/HiddenContactItem";
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { Snackbar } from "@mui/material";



export default function HiddenContacts(){

   const { isLoading } = useSelector(store => store.loading)
   const { hiddenContacts } = useSelector(store => store.contact.contactsData)
   const { isFetching } = useSelector(store => store.contact)
   const [showContacts,setShowContacts] = useState(isFetching ? false : true)
   const [contactVisible,setContactVisible] = useState(false)


   useEffect(()=> {
      let timer;
      if(isFetching){
         timer = setTimeout(() => {
            setShowContacts(true)
         }, 4000)
      }
   },[isFetching])

   useEffect(() => {
      if(contactVisible){
         setTimeout(() => {
            setContactVisible(false)
         }, 5000);
      }
   },[contactVisible])

   return(
      !isLoading &&
      <>
         <section className="main-content hidden-contacts">
            <div>
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
                     hiddenContacts.length && showContacts ? 
                     hiddenContacts.map(contactInfo => {
                           return(
                              <HiddenContactItem
                                 key={contactInfo.id}
                                 contactInfo={{...contactInfo}}
                                 setContactVisible={setContactVisible}
                              />
                           )
                        })
                        :
                     <h2>You Don't Have Any Hidden Contact</h2>
                  }
               </div>
            </div>
         </section>
         <Snackbar
            open={contactVisible}
            autoHideDuration={5000}
            onClose={() => setContactVisible(false)}
            message={"Contact Unhidden"}
         />
      </>
   )
}