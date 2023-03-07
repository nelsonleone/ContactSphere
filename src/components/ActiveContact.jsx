import { AiFillStar } from "react-icons/ai"
import { BsThreeDots } from "react-icons/bs"
import { useEffect, useState, useCallback, useRef} from "react";
import { setAddToTrash, setHidenContact , handleContactStarring } from "../redux/features/asyncThunks";
import { useDispatch, useSelector } from "react-redux";
import useId from "@mui/material/utils/useId";
import {useNavigate} from "react-router-dom"
import ContactImage from "./ContactImage";
import phoneNumberStringFormatter from "./Helper/phoneNumberStringFormatter";


export default function ActiveContact(props){
   const {
      isStarred,
      isHidden,
      inTrash,
      email,
      phoneNumber,
      jobTitle,
      companyName,
      prefix,
      firstName,
      lastName,
      contactImage,
   }  =  props.contactInfo;


   const { setAddedToTrash , setAddedToHiddenContacts} = props;
   const [localIsStarredValue,setLocalIsStarredValue] = useState(isStarred)
   const [openContactMenu,setOpenContactMenu] = useState(false)
   const contactMenuRef = useRef(null)
   const [blur,setBlur] = useState({opacity:""})
   const contactMenuIconRef = useRef(null)
   const id = useId()
   const { error } = useSelector(store => store.contact.contactsData)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const contactMenuStyling = {
      visibility: openContactMenu ? "visible" : "hidden"
   }


   const removeContactMenu = useCallback((e) => {
      if(contactMenuRef.current && !contactMenuIconRef.current.contains(e.target) && !contactMenuRef.current.contains(e.target)){
         setOpenContactMenu(false)
      }
   })

   useEffect(() => {
      document.addEventListener('mouseup',removeContactMenu)

      return () => window.removeEventListener('mouseup',removeContactMenu)
   },[removeContactMenu])

   useEffect(() => {
      document.addEventListener('keydown',removeContactMenu)

      return () => window.removeEventListener('keydown',removeContactMenu)
   },[removeContactMenu])


   async function handleAddToTrash(e){
      e.stopPropagation()
      setBlur({opacity:".4"})
      await dispatch(setAddToTrash(props.contactInfo))
      setAddedToTrash(true)
   }

   async function handleHideContact(e){
      e.stopPropagation()
      setBlur({opacity:".4"})
      await dispatch(setHidenContact(props.contactInfo))
      setAddedToHiddenContacts(true)
   }

   function handleStarContact(e){
      e.stopPropagation()
      setLocalIsStarredValue(!localIsStarredValue)
      dispatch(handleContactStarring(props.contactInfo))
   }

   function handleDotsClick(e){
      e.stopPropagation()
      setOpenContactMenu(!openContactMenu)
   }


   useEffect(() => {
      
      const blurTimeout = setTimeout(() => {
         setBlur({opacity:""})
      }, 2000);

      return () => clearTimeout(blurTimeout)
   },[blur])

   return(
      <>
         <div className="contact" onClick={() => navigate(`/contact/${props.contactInfo.id}`)}>
            <div className="name_image-container">
               <ContactImage image={contactImage} className="contactUser-image" />
               <span className="contact-name" aria-label="name-header">
                  <span>{prefix}</span>
                  <span>{firstName}</span>
                  <span>{lastName}</span>
               </span>
            </div>
            <span className="hide-for-mobile" aria-label="email-header">{email}</span>
            <span className="hide-for-mobile" aria-label="phoneNumber-header">{phoneNumberStringFormatter(phoneNumber)}</span>
            <span className="hide-for-mobile work" aria-label="work-header">{jobTitle}/{companyName}</span>

            <div className="contact-icons">
               <AiFillStar className={localIsStarredValue ? "star-icon starred" : "star-icon"} aria-label="star this contact" onClick={handleStarContact} />
               <button
                  className="dots-icon" 
                  aria-label="open contact options" 
                  title="open menu"
                  aria-controls={`${id}contact-action-menu`}
                  aria-expanded={openContactMenu}
                  ref={contactMenuIconRef}
                  onClick={handleDotsClick}
               >
                  <BsThreeDots/>
               </button>
            </div>
            <div 
               className="contact-action-menu" 
               id={`${id}contact-action-menu`}
               ref={contactMenuRef}
               style={contactMenuStyling}
            >
               <button onClick={handleHideContact}>Hide</button>
               <button onClick={handleAddToTrash}>Trash</button>
            </div>
         </div>
      </>
   )
}