import { useParams } from "react-router-dom"
import { useAppSelector } from "../customHooks/reduxCustomHooks"
import PageWrapper from "../components/PageWrapper"
import { ManageLabelButton, StarIconButton } from "../../lib/with-tooltip"
import ContactMenu from "../components/ContactFormContent/ContactMenu"
import { Button } from "@mui/material"

export default function ContactViewPage(){

   const { id } = useParams()
   const { contacts } = useAppSelector(store => store.userData)
   const contact = contacts.find(c => c._id === id)


   return(
      <PageWrapper className="contact_view_page" title={`ContactSphere ${contact ? `- ${contact.name}` : ""}`}>
         <main>
            {
               contact ?
               <>
                  <div className="top_section">
                     <div className="contact_repPhoto_view">
                        <img src={contact?.repPhoto || "images/placeholder-for-user.png"} />
                     </div>
                     
                     <div>
                        <p>{contact?.name}</p>
                        <span>{contact?.phoneNumber}</span>
                        <ul>
                           <li>{contact.jobTitle}</li>
                           <li>{contact.department}</li>
                           <li>{contact.companyName}</li>
                        </ul>

                        <ManageLabelButton 
                           handleClick={() => {}} 
                           disabled={false} 
                           penMode={contact.labelledBy?.length > 0} 
                           className={!contact.labelledBy?.length ? "add_label_btn" : "add_label_btn penMode"} 
                        />
                     </div>

                     <div>
                        <StarIconButton starred={contact.inFavourites} handleStarring={() => {}} />
                        <ContactMenu method="single" />
                        <Button
                           type="submit" 
                           className="fx-button" 
                           variant="contained"  
                          >
                           Edit
                        </Button>
                     </div>
                  </div>
               </>
               :
               <div className="nsc_content">
                  <p role="alert">This Contact Was Not Found</p>
               </div>
            }
         </main>
      </PageWrapper>
   )
}