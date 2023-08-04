import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../customHooks/reduxCustomHooks"
import PageWrapper from "../components/PageWrapper"
import { EmailLinkButton, GoBackButton, ManageLabelButton, SocialSiteLink, StarIconButton } from "../../lib/with-tooltip"
import ContactMenu from "../components/ContactFormContent/ContactMenu"
import { Button, Tooltip } from "@mui/material"
import { MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md"
import { BsChatHeartFill, BsTelephone } from "react-icons/bs"
import { FaBirthdayCake } from "react-icons/fa"
import { CgWebsite } from "react-icons/cg"
import { TbCirclesRelation } from "react-icons/tb"
import { nanoid } from '@reduxjs/toolkit'

export default function ContactViewPage(){
   
   const { id } = useParams()
   const { contacts } = useAppSelector(store => store.userData)
   const contact = contacts.find(c => c._id === id?.toString())
   const contactName = contact?.name || `${contact?.prefix} ${contact?.firstName} ${contact?.lastName} ${contact?.suffix}`;


   return(
      <PageWrapper className="contact_view_page" title={`ContactSphere ${contact ? `- ${contactName}` : ""}`}>
         <main>
            {
               contact ?
               <>
                  <div className="top_section">
                     <GoBackButton />
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

                  <div className="contact_net_links">
                     <EmailLinkButton mailTo={contact.email} />
                     <SocialSiteLink site={contact.social.handle} />
                  </div>

                  <section className="details_preview_section">
                     <h3>Contact Details</h3>
                     <div>
                        <MdOutlineEmail aria-hidden="true" />
                        <p>{contact.email}</p>
                        <Button variant="outlined">Send Mail</Button>
                     </div>

                     <div>
                        <BsTelephone aria-hidden="true" />
                        <p>{contact.phoneNumber}</p>
                        <Tooltip title={`Call ${contact.phoneNumber}`}>
                           <Link to={`tel:${contact.phoneNumber}`}>
                              Call
                           </Link>
                        </Tooltip>
                     </div>

                     <div>
                        <MdOutlineLocationOn aria-hidden="true" />
                        <Link to={`https://www.google.com/maps/dir/${contact.street},${contact.city},${contact.state}+${contact.country}`}>
                           <p>{contact.address.street}</p>
                           <p>{contact.address.postalCode}</p>
                           <p>{contact.address.city}</p>
                           <p>{contact.address.state}</p>
                           <p>{contact.address.country}</p>
                        </Link>
                     </div>

                     <div>
                        <FaBirthdayCake aria-hidden="true" />
                        <p>{contact.birthday}</p>
                     </div>

                     <div>
                        <CgWebsite aria-hidden="true" />
                        <p>{contact.website}</p>
                        <Link to={contact.website}>Visit Website</Link>
                     </div>

                     <div className="relatedPeople_details_view">
                        <TbCirclesRelation aria-hidden="true" />
                        {
                           contact.relatedPeople.map(val => (
                              <div key={nanoid()}>
                                 <p>{val.name}</p>
                                 <p>{val.label}</p>
                              </div>
                           ))
                        }
                     </div>

                     <div className="social_details">
                        <BsChatHeartFill />
                        <p>{contact.social.site}</p>
                        <span>{contact.social.handle}</span>
                        <Link to={contact.social.handle}>See Profile</Link>
                     </div>
                  </section>
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