import { MdOutlineEdit } from "react-icons/md"
import { AiFillStar } from "react-icons/ai"
import { BsThreeDots } from "react-icons/bs"
import { useEffect, useState, useCallback, useRef} from "react";
import { setAddToTrash, setHidenContact , handleContactStarring } from "../redux/features/asyncThunks";
import { useDispatch, useSelector } from "react-redux";
import useId from "@mui/material/utils/useId";


export default function ActiveContact(props){
   const {
      isStarred,
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
   const [openContactMenu,setOpenContactMenu] = useState(false)
   const contactMenuRef = useRef(null)
   const contactMenuIconRef = useRef(null)
   const id = useId()
   const { error } = useSelector(store => store.contact.contactsData)
   const dispatch = useDispatch()
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


   async function handleAddToTrash(){
      await dispatch(setAddToTrash(props.contactInfo))
      setAddedToTrash(true)
   }

   async function handleHideContact(){
      await dispatch(setHidenContact(props.contactInfo))
      setAddedToHiddenContacts(true)
   }

   return(
      <>
         <div className="contact">
            <div className="name_image-container">
               <img src={contactImage ? contactImage : "/images/userIcon.webp"} alt="contact image" className="contactUser-image" />
               <span className="contact-name" aria-label="name-header">
                  <span>{prefix}</span>
                  <span>{firstName}</span>
                  <span>{lastName}</span>
               </span>
            </div>
            <span className="hide-for-mobile" aria-label="email-header">{email}</span>
            <span className="hide-for-mobile" aria-label="phoneNumber-header">{phoneNumber}</span>
            <span className="hide-for-mobile work" aria-label="work-header">{jobTitle}/{companyName}</span>

            <div className="contact-icons">
               <MdOutlineEdit className="edit-icon" aria-label="Edit this contact" />
               <AiFillStar className={isStarred ? "star-icon starred" : "star-icon"} aria-label="star this contact" onClick={() => dispatch(handleContactStarring(props.contactInfo))} />
               <button
                  className="dots-icon" 
                  aria-label="open contact options" 
                  title="open menu"
                  aria-controls={`${id}contact-action-menu`}
                  aria-expanded={openContactMenu}
                  ref={contactMenuIconRef}
                  onClick={() => setOpenContactMenu(!openContactMenu)}
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