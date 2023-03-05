import { Timestamp } from "firebase/firestore";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setAddToTrash, setDeleteContactForever } from "../redux/features/asyncThunks";
import {RiDeleteBin2Fill}  from "react-icons/ri"

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
   const { setContactRemovedFromTrash, setEmptyTrash, setDeletedContact } = props;
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
               <img src={contactImage ? contactImage : "/images/userIcon.webp"} alt="contact image" className="contactUser-image" />
               <span className="contact-name" aria-label="trash-name-header">
                  <span>{prefix}</span>
                  <span>{firstName}</span>
                  <span>{lastName}</span>
               </span>
            </div>
            <span className="date-deleted" aria-label="trash-date-deleted">{formattedTrashData}</span>
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
         <Modal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Sure You Want To Delete This Contact
               </Typography>
               <div className="modal-action-btns" sx={{ mt: 2 }} >
                  <button onClick={handleDelete}>Yes, Delete</button>
                  <button onClick={() => setOpenDeleteModal(false)}>No, Cancle</button>
               </div>
            </Box>
         </Modal>
      </>
   )
}