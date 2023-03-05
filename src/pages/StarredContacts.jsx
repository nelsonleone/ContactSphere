import { useSelector } from "react-redux";
import { useState, useEffect } from "react"
import StarredContactItem from "../components/StarredContactItem";
import { Snackbar } from "@mui/material";

export default function StarredContacts(){
   
   const { starredContacts, isFetching } = useSelector(store => store.contact.contactsData)
   const [showContacts,setShowContacts] = useState(false)
   const { isLoading } = useSelector(store => store.loading)
   const [starredContactRemoved,setStarredContactRemoved] = useState(false)

   useEffect(()=> {
      let timer;
      if(!isFetching){
         timer = setTimeout(() => {
            setShowContacts(true)
         }, 6000);
      }
   },[isFetching])

   useEffect(() => {
      if(starredContactRemoved){
         setTimeout(() => {
            setStarredContactRemoved(false)
         }, 5000);
      }
   },[starredContactRemoved])

   return(
      !isLoading &&
      <>
         <section className="main-content starred-contacts">
            <div>
               <div>
                  <h2 className="page-heading">Your Favourited <br/>Contacts</h2>
               </div>
               <div className="starred-contactItem-container">
                  {
                     !showContacts ?
                     <h2>Getting Your Starred Contacts.....</h2>
                     :
                     showContacts && starredContacts.length ?
                     starredContacts.map(contactInfo => {
                        return(
                           <StarredContactItem 
                              key={contactInfo.id}
                              contactInfo = {{...contactInfo}}
                              setStarredContactRemoved = {setStarredContactRemoved}
                           />
                        )
                     })
                     :
                     <h2>Your Don't Have Any Starred Contact</h2>
                  }
               </div>
            </div>
         </section>
         <Snackbar
            open={starredContactRemoved}
            autoHideDuration={5000}
            onClose={() => setStarredContactRemoved(false)}
            message={"Contact Unfavourited"}
         />
      </>
   )
}