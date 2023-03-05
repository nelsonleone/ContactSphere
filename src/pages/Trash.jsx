import { Snackbar } from "@mui/material"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import TrashContactItem from "../components/TrashContactItem"

export default function Trash(){

   const { isLoading } = useSelector(store => store.loading)
   const { inTrash, isFetching } = useSelector(store => store.contact.contactsData)
   const [showContacts,setShowContacts] = useState(false)
   const [contactRemovedFromTrash,setContactRemovedFromTrash] = useState(false)
   const [deletedContact,setDeletedContact] = useState(false)
   const [emptyTrash,setEmptyTrash] =  useState(false)


   useEffect(()=> {
      let timer;
      if(!isFetching){
         timer = setTimeout(() => {
            setShowContacts(true)
         }, 5000);
      }

      return () => clearTimeout(timer)
   },[isFetching])

   useEffect(() => {
      if(!contactRemovedFromTrash)return;

      const timer = setTimeout(() => {
         setContactRemovedFromTrash(false)
      }, 5000)

      return () => clearTimeout(timer)
   },[contactRemovedFromTrash])

   useEffect(() => {
      if(!deletedContact)return;
      const timer = setTimeout(() => {
         setDeletedContact(false)
      }, 5000)

      return () => clearTimeout(timer)
   },[deletedContact])

   useEffect(() => {
      if(!emptyTrash) return ;
      const timer = setTimeout(() => {
         setEmptyTrash(false)
      }, 5000);

      return () => clearTimeout(timer)
   },[emptyTrash])

   return(
      !isLoading &&
      <>
         <section className="main-content trash">
            <div>
               <div className="header_labels">
                  <h4 id="trash-name-header">Name</h4>
                  <h4 id="trash-date-deleted">Date Deleted</h4>
               </div>

               <div>
                  {
                     !showContacts ?
                     <h2>Setting Up Your Trash......</h2>
                     :
                     inTrash.length && showContacts ? 
                     inTrash.map(contactInfo => {
                           return(
                              <TrashContactItem
                                 key={contactInfo.id}
                                 contactInfo={{...contactInfo}}
                                 setContactRemovedFromTrash={setContactRemovedFromTrash}
                                 setEmptyTrash={setEmptyTrash}
                              />
                           )
                        })
                        :
                     <h2>You Don't Have Any Contact  In Trash</h2>
                  }
               </div>
            </div>
         </section>
         <Snackbar
            open={contactRemovedFromTrash}
            autoHideDuration={5000}
            onClose={() => setContactRemovedFromTrash(false)}
            message={"Contact Has Been Restored"}
         />
         <Snackbar
            open={emptyTrash}
            autoHideDuration={5000}
            onClose={() => setEmptyTrash(false)}
            message={"Trash Have Been Emptied"}
         />
         <Snackbar
            open={deletedContact}
            autoHideDuration={5000}
            onClose={() => setDeletedContact(false)}
            message={"Contact Deleted"}
         />
      </>
   )
}