import { Timestamp } from "firebase/firestore";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setAddToTrash, setDeleteContactForever } from "../redux/features/asyncThunks";
import {RiDeleteBin2Fill}  from "react-icons/ri"
import ContactImage from "./ContactImage"
import { useState } from "react";


export default function TrashContactItem(props){


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
      trashDate
   }  =  props.contactInfo;

   const validTrashDate = Timestamp.fromMillis(trashDate)
   const date = validTrashDate.toDate()
   const options = { day: 'numeric', month: 'long', year: 'numeric' };
   const formattedTrashData = date.toLocaleDateString('en-US', options).replace(/(\d+)(st|nd|rd|th)/, '$1<sup>$2</sup>')
   const { setContactRemovedFromTrash, setEmptyTrash, setDeletedContact , setContactVisible} = props;
   const [openDeleteModal,setOpenDeleteModal] = useState(false)
   const dispatch = useDispatch()

   async function handleRestoreContact(){
      await dispatch(setAddToTrash(props.contactInfo))
      setContactVisible(true)
   }

   async function handleDelete(){
      await dispatch(setDeleteContactForever(props.contactInfo))
      setOpenDeleteModal(false)
      setDeletedContact(true)
   }

   return(
      <>
         <div className="contact trash-contact">
            <div className="name_image-container">
               <ContactImage image={contactImage} className="contactUser-image"/>
               <span className="contact-name" aria-label="trash-name-header">
                  <span>{prefix}</span>
                  <span>{firstName}</span>
                  <span>{lastName}</span>
               </span>
            </div>
            <span className="date-deleted" aria-label="trash-date-deleted">{formattedTrashData}</span>
            <div className="trashContact-action-btns">
               <button
                  title="Restore Contact"
                  onClick={handleRestoreContact}
                  className="restore-contact-btn"
               >
                  Restore
                  <FaTrashRestoreAlt />
               </button>
               <button
               title="delete"
               onClick={() => setOpenDeleteModal(true)}
               className="delete-contact-btn"
               >
               Delete
               <RiDeleteBin2Fill  />
               </button>
            </div>
         </div>

         {
            openDeleteModal && 
            <div className="trash-delete-modal"
               onClose={() => setOpenDeleteModal(false)}
               aria-labelledby="modal-modal-title"
               id="trash-delete-modal"
               >
               <div className="trash-delete-modal-inner">
                  <h2 id="modal-modal-title">
                     Sure You Want To Delete This Contact
                  </h2>
                  <div className="modal-action-btns">
                     <button onClick={handleDelete}>Yes, Delete</button>
                     <button onClick={() => setOpenDeleteModal(false)} aria-controls="trash-delete-modal">No, Cancle</button>
                  </div>
               </div>
            </div>
         }
      </>
   )
}