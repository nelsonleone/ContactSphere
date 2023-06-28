import { Link } from "react-router-dom";
import PhotoUrlAvatar from "../../../lib/Avatars/PhotoUrlAvatar";
import { IContactsFromDB } from "../../vite-env";
import { memo, useEffect, useState } from "react";
import { EditIconButton, StarIconButton, ContactMenuButton } from "../../../lib/with-tooltip";
import CustomCheckbox from "../../../lib/customInputs/CustomCheckbox";
import { useNavigate } from "react-router-dom";
import { useAddToFavouritesMutation } from "../../RTK/features/injectedContactsApiQueries";
import { useAppDispatch, useAppSelector } from "../../customHooks/reduxCustomHooks";
import { setSelected } from "../../RTK/features/contactMultiSelectSlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";
import { setEdittedContact } from "../../RTK/features/userDataSlice";


interface IContactItemProps extends IContactsFromDB {
  
}

function ContactItem(props:IContactItemProps){

   const {
      name,
      repPhoto,
      firstName,
      lastName,
      prefix,
      suffix,
      email,
      jobTitle,
      phoneNumber,
      _id
   } = props;

   const contactName = !name ? `${prefix} ${firstName} ${lastName} ${suffix}` : name;
   const [openMenu,setOpenMenu] = useState(false)
   const [starred,setStarred] = useState(false)
   const navigate = useNavigate()
   const uid = useAppSelector(store => store.authUser.userDetails.uid)
   const [addToFavourites,{}] = useAddToFavouritesMutation()
   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const [isSelected,setIsSelected] = useState(selectedContacts.some(contactId => contactId === _id))
   const dispatch = useAppDispatch()

   const handleStarring = async() => {
      setStarred(!setStarred)

      try{
         if (!uid){
            // precaution
            throw new Error("Unauthourized Action, Please Login")
         }
         const interactedContact = await addToFavourites({contactID:_id,authUserUid:uid}).unwrap()
         dispatch(setEdittedContact(interactedContact))
      }

      catch(err:any|unknown){
         dispatch(setShowAlert({
            alertMessage: err.message,
            severity: AlertSeverity.ERROR
         }))
      }
   }

   useEffect(() => {
      setIsSelected(selectedContacts.some(contactId => contactId === _id))
   },[selectedContacts.length])

   return(
      <div className="contact" aria-label="Contact" aria-describedby={`${_id}-description`}>
         <PhotoUrlAvatar nameForAlt={`${firstName} ${lastName} image`} photoURL={repPhoto} size={25} />
         <CustomCheckbox handleCheck={() => dispatch(setSelected(_id))} checked={isSelected} />
         <p id={`${_id}-description`} aria-label="Contact Name" aria-labelledby="name-col">{contactName}</p>
         <Link to={`mailto:${email}`} aria-label="Email" aria-labelledby="email-col">{email}</Link>
         <p aria-label="Contact Phone Number" aria-labelledby="phone-col">{phoneNumber}</p>
         <p aria-label="Contact Job Title">{jobTitle}</p>

         <div className="contact_action_icons">
            <StarIconButton starred={starred} handleStarring={() => handleStarring()} />
            <EditIconButton navigateToEditPage={() => navigate(`/c/${_id}`)} />
            <ContactMenuButton openContactMenu={() => setOpenMenu(prevState => prevState = !prevState)} />
         </div>
      </div>
   )
}

export default memo(ContactItem)