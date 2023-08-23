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
import PhotoUrlAvatar from "../../lib/Avatars/PhotoUrlAvatar"
import EditButton from "../components/ContactFormContent/EditButton"
import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import { Breakpoints } from '../enums'
import { Sites } from "../vite-env"
import { useState } from "react"
import LabelMenu from "../../lib/popups/LabelMenu"
import AddLabelDialog from "../../lib/popups/AddLabelDialog"
import checkExternalLinks from "../utils/helperFns/checkExternalLinks"
import { useAddToFavouritesMutation } from "../RTK/features/api/injectedContactsApiQueries"
import AddedLabels from "../components/ContactFormContent/input_sections/AddedLabels"
import formatDate from "../utils/helperFns/formatDate"

export default function ContactViewPage(){
   
   const { id } = useParams()
   const { contacts } = useAppSelector(store => store.userData)
   const contact = contacts.find(c => c._id === id?.toString())
   const contactName = contact?.name || `${contact?.prefix} ${contact?.firstName} ${contact?.lastName} ${contact?.suffix}`;
   const { openNav } = useAppSelector(store => store.openNav)
   const [openAddLabelDialog,setOpenAddLabelDialog] = useState(false)
   const [showLabelMenu,setShowLabelMenu] = useState(false)
   const [addToFavourites] = useAddToFavouritesMutation()
   const avatarNameForAlt = contactName.split(' ').filter(v => v !== "").join(' ')
   const googleMapsQuery = `https://maps.google.com/maps?q=${contact?.address.street ? contact?.address.street + "," : ""}${contact?.address.postalCode ? contact?.address.postalCode + "," : ""}${contact?.address.city ? contact.address.city + "," : ""}${contact?.address.state ? contact?.address.state + "," : ""}${contact?.address.country ? contact?.address.country : ""}`;



   return(
      <PageWrapper className="contact_view_page" title={`ContactSphere ${contact ? `- ${contactName}` : ""}`}>
         <main>
            {
               contact ?
               <>
                  <div className={!openNav ? "top_section_rx" : "top_section_rx resize_page_top_section_rx"}>
                     <GoBackButton />
                     <div className="contact_repPhoto_view">
                        <PhotoUrlAvatar size={window.innerWidth < Breakpoints.Large ? 140 : 180} nameForAlt={avatarNameForAlt} photoURL={contact.repPhoto} />
                     </div>
                     
                     <div className="top_details_highlight">
                        <h2>{contactName} <i>{contact.nickname}</i></h2>
                        <span>{formatPhoneNumberIntl(contact?.phoneNumber)}</span>

                        {
                           contact.jobTitle || contact.department || contact.companyName ?
                           <ul className="job_details">
                              {
                                 contact.jobTitle &&
                                 <li>{contact.jobTitle}</li>
                              }
                              {
                                 contact.department &&
                                 <li>{contact.department}</li>
                              }
                              {
                                 contact.companyName &&
                                 <li>{contact.companyName}</li>
                              }
                           </ul>
                           :
                           null
                        }

                        <AddedLabels contactId={contact._id} phoneNumber={contact.phoneNumber} labelsArray={contact.labelledBy} />

                        <ManageLabelButton 
                           handleClick={() => setShowLabelMenu(!showLabelMenu)} 
                           disabled={false} 
                           penMode={contact.labelledBy?.length > 0} 
                           className={!contact.labelledBy?.length ? "add_label_btn" : "add_label_btn penMode"} 
                        />
                        <LabelMenu 
                           setOpenAddLabelModal={setOpenAddLabelDialog} 
                           labelMenuFor="contactPage" 
                           labelsArray={contact.labelledBy} 
                           showLabelMenu={showLabelMenu} 
                           setShowLabelMenu={setShowLabelMenu} 
                           contactId={contact._id}
                           phoneNumber={contact.phoneNumber}
                        />
                        <AddLabelDialog mode="create" setOpen={setOpenAddLabelDialog} open={openAddLabelDialog} />
                     </div>

                     <div>
                        <StarIconButton 
                          starred={contact.inFavourites}  
                          inFavourites={contact.inFavourites}
                          _id={contact._id}
                          phoneNumber={contact.phoneNumber}
                          addToFavourites={addToFavourites}
                        />
                        <ContactMenu contactLabels={contact.labelledBy}  method="single" contactId={contact._id} phoneNumber={contact.phoneNumber} />
                        <EditButton navigateTo={`/c/edit/${contact._id}`} />
                     </div>

                     <div className="contact_net_links">
                        <EmailLinkButton mailTo={contact.email} />
                        <SocialSiteLink site={contact.social.site as Sites} handle={contact.social.handle} />
                     </div>
                  </div>


                  <section className="details_preview_section">
                     <div>
                        <h3>Contact Details</h3>

                        {
                           contact.email &&
                           <div className="email_detail">
                              <MdOutlineEmail aria-hidden="true" />
                              <p>{contact.email}</p>
                              <Button LinkComponent='a' href={`https://mail.google.com/mail/?view=cm&to=${contact.email}`} variant="text" target="_blank">Send Mail</Button>
                           </div>
                        }

                        {
                           contact.phoneNumber &&
                           <div className="phoneNumber_detail">
                              <BsTelephone aria-hidden="true" />
                              <p>{formatPhoneNumber(contact.phoneNumber)}</p>
                              <Tooltip title={`Call ${contact.phoneNumber}`}>
                                 <Link to={`tel:${contact.phoneNumber}`}>
                                    Call
                                 </Link>
                              </Tooltip>
                           </div>
                        }

                        {
                           Object.values(contact.address).length ?
                           <div className="location_detail">
                              {
                                 Object.values(contact.address).some(val => val !== "") &&
                                 <MdOutlineLocationOn aria-hidden="true" />
                              }
                              <a target="_blank" href={googleMapsQuery}>
                                 {
                                    contact.address.street &&
                                    <p>{contact.address.street}</p>
                                 }
                                 {
                                    contact.address.postalCode &&
                                    <p>{contact.address.postalCode}</p>
                                 }
                                 {
                                    contact.address.city &&
                                    <p>{contact.address.city}</p>
                                 }
                                 {
                                    contact.address.state &&
                                    <p>{contact.address.state}</p>
                                 }
                                 {
                                    contact.address.country &&
                                    <p>{contact.address.country}</p>
                                 }
                              </a>
                           </div>
                           :
                           null
                        }

                        {
                           contact.birthday &&
                           <div>
                              <FaBirthdayCake aria-hidden="true" />
                              <p>{formatDate(contact.birthday as string,true)}</p>
                           </div>
                        }

                        {
                           contact.website &&
                           <div>
                              <CgWebsite aria-hidden="true" />
                              <p>{contact.website}</p>
                              <Link target="_blank" to={checkExternalLinks(contact.website)}>Visit Website</Link>
                           </div>
                        }
                        {
                           contact.relatedPeople.length ?
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
                           :
                           null
                        }

                        {
                           contact.social.site && contact.social.handle ?
                           <div className="social_details">
                              <BsChatHeartFill />
                              <p>{contact.social.site}</p>
                              <span>{contact.social.handle}</span>
                              <Link to={checkExternalLinks(contact.social.handle)}>See Profile</Link>
                           </div>
                           : 
                           null
                        }
                     </div>

                     <div>
                        <h3>History</h3>
                        <p>Last editted <span>{formatDate(contact.updatedAt,false)}</span></p>
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