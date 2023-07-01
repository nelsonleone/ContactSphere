import { Link } from "react-router-dom";
import PhotoUrlAvatar from "../../../lib/Avatars/PhotoUrlAvatar";
import { IContactsFromDB } from "../../vite-env";
import { memo, useEffect, useState } from "react";
import { EditIconButton, StarIconButton } from "../../../lib/with-tooltip";
import CustomCheckbox from "../../../lib/customInputs/CustomCheckbox";
import { useNavigate } from "react-router-dom";
import { useAddToFavouritesMutation } from "../../RTK/features/injectedContactsApiQueries";
import { useAppDispatch, useAppSelector } from "../../customHooks/reduxCustomHooks";
import { setSelected } from "../../RTK/features/contactMultiSelectSlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";
import { setEdittedContact } from "../../RTK/features/userDataSlice";
import handleContactDetailsDisplay from "../../utils/helperFns/handleContactDetailsDisplay";
import ContactMenu from "./ContactMenu";


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
      _id,
      inFavourites,
      labelledBy
   } = props;

   const contactName = !name ? `${prefix} ${firstName} ${lastName} ${suffix}` : name;
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

         // Status Is Used To Update The Interacted Contact [updates "inFavourites" to false if true and vice-versa]
         const status = inFavourites ? false : true;
         const interactedContact = await addToFavourites({contactID:_id,authUserUid:uid,status}).unwrap()
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
      <div tabIndex={0} className={`contact ${isSelected ? "selected_contact" : ""}`} aria-label="Contact" aria-describedby={`${_id}-description`}>
         <PhotoUrlAvatar nameForAlt={`${firstName} ${lastName} image`} photoURL={repPhoto} size={44} />
         <CustomCheckbox handleCheck={() => dispatch(setSelected(_id))} checked={isSelected} />
         <p id={`${_id}-description`} aria-label="Contact Name" aria-labelledby="name-col">{handleContactDetailsDisplay(contactName)}</p>
         <Link to={`mailto:${email}`} aria-label="Email" aria-labelledby="email-col">{handleContactDetailsDisplay(email)}</Link>
         <p aria-label="Contact Phone Number" aria-labelledby="phone-col">{handleContactDetailsDisplay(phoneNumber)}</p>
         <p aria-label="Contact Job Title" aria-describedby="jobTitle-col">{handleContactDetailsDisplay(jobTitle)}</p>

         <div className="contact_action_icons">
            <StarIconButton starred={starred} handleStarring={() => handleStarring()} />
            <EditIconButton navigateToEditPage={() => navigate(`/c/${_id}`)} />
            <ContactMenu contactId={_id} contactLabels={labelledBy} />
         </div>
      </div>
   )
}

export default memo(ContactItem)