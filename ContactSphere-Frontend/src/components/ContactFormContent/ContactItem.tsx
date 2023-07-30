import { Link } from "react-router-dom";
import PhotoUrlAvatar from "../../../lib/Avatars/PhotoUrlAvatar";
import { IContactsFromDB } from "../../vite-env";
import { memo, useState, useEffect } from "react";
import { EditIconButton, RestoreFromTrashButton, RestoreToActiveButton, StarIconButton } from "../../../lib/with-tooltip";
import CustomCheckbox from "../../../lib/customInputs/CustomCheckbox";
import { useNavigate } from "react-router-dom";
import { useAddToFavouritesMutation,useHideContactMutation, useHideMultipleContactsMutation, useRestoreFromTrashMutation } from "../../RTK/features/api/injectedContactsApiQueries";
import { useAppDispatch, useAppSelector } from "../../customHooks/reduxCustomHooks";
import { setSelected } from "../../RTK/features/slices/contactMultiSelectSlice";
import { setShowAlert } from "../../RTK/features/slices/alertSlice";
import { AlertSeverity, ContactItemLocation } from "../../enums";
import { setEdittedContact } from "../../RTK/features/slices/userDataSlice";
import handleContactDetailsDisplay from "../../utils/helperFns/handleContactDetailsDisplay";
import ContactMenu from "./ContactMenu";
import { setShowSnackbar } from "../../RTK/features/slices/snackbarDisplaySlice";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/slices/wrkSnackbarSlice";
import stopUnauthourizedActions from "../../utils/helperFns/stopUnauthourizedActions";
import clientAsyncHandler from "../../utils/helperFns/clientAsyncHandler";
import handleAsyncHideContact from "../../utils/helperFns/handleAsyncHideContact";
import { Button } from "@mui/material";
import handleAsyncRestore from "../../utils/helperFns/handleAsyncRestoreContacts";

interface IContactItemProps extends IContactsFromDB {
   location: ContactItemLocation
}

function ContactItem(props:IContactItemProps){

   const {
      repPhoto,
      firstName,
      lastName,
      email,
      jobTitle,
      phoneNumber,
      _id,
      inFavourites,
      labelledBy,
      deletedAt,
      companyName
   } = props;

   const navigate = useNavigate()
   const uid = useAppSelector(store => store.authUser.userDetails.uid)
   const [addToFavourites,{}] = useAddToFavouritesMutation()
   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const [isSelected,setIsSelected] = useState(selectedContacts.some(contactId => contactId === _id))
   const [hideContact] = useHideContactMutation()
   const [hideMultipleContacts] = useHideMultipleContactsMutation()
   const [restoreContactFromTrash] = useRestoreFromTrashMutation()
   const dispatch = useAppDispatch()
   const { columnOrder } = useAppSelector(store => store.userLocalSetting)
   const nameAreaOrder = columnOrder.find(v => v.colName === "name")?.order;
   const phoneAreaOrder = columnOrder.find(v => v.colName === "phone-number")?.order;
   const emailAreaOrder = columnOrder.find(v => v.colName === "email")?.order;
   const jobTitleAreaOrder = columnOrder.find(v => v.colName === "job-title")?.order;
   const { contacts } = useAppSelector(store => store.userData)

   const handleStarring = async() => {
      try{
         dispatch(setShowWrkSnackbar())
         await stopUnauthourizedActions(uid)
         // Status Is Used To Update The Interacted Contact [updates "inFavourites" to false if true and vice-versa]
         const status = inFavourites ? false : true;
         const interactedContact = await addToFavourites({contactId:_id,authUserUid:uid!,status}).unwrap()

         if(!interactedContact){
            throw new Error("An Error Occured Starring Contact, Try Again")
         }

         dispatch(setEdittedContact(interactedContact))
         
         dispatch(setShowSnackbar({
            // inFavourites Is Still In Previous State Due to Function Still Running
            snackbarMessage: inFavourites  ? `Star removed from ${phoneNumber}` : `${phoneNumber} have been  Starred`,
         }))
      }

      catch(err:any|unknown){
         dispatch(setShowAlert({
            alertMessage: err.message || "Error Interacting With Contact, Try Again" ,
            severity: AlertSeverity.ERROR
         }))
      }

      finally{
         dispatch(setHideWrkSnackbar())
      }
   }

   const handleRestoreToActive = () => clientAsyncHandler(
      async() => {
         const method = selectedContacts.length > 0 ? "multi" : "single";
         await stopUnauthourizedActions(uid)
         await handleAsyncHideContact(
            dispatch,
            method,
            _id,
            false,
            uid!,
            selectedContacts,
            contacts,
            hideContact,
            hideMultipleContacts
         )
      },
      dispatch
   )

   const handleRestoreFromTrash = () => clientAsyncHandler(
      async() => {
         const method = selectedContacts.length > 0 ? "multi" : "single";
         await stopUnauthourizedActions(uid)
         await handleAsyncRestore(
            restoreContactFromTrash,
            null,
            method,
            uid!,
            _id,
            selectedContacts,
            dispatch,
            contacts
         )
      },
      dispatch
   )


   useEffect(() => {
      setIsSelected(selectedContacts.some(contactId => contactId === _id))
   },[selectedContacts.length])

   return(
      <div tabIndex={0} className={`contact ${isSelected ? "selected_contact" : ""}`} aria-label="Contact" aria-describedby={`${_id}-description`}>
         <PhotoUrlAvatar nameForAlt={`${firstName} ${lastName}`} photoURL={repPhoto} size={44} />
         <CustomCheckbox handleCheck={() => dispatch(setSelected(_id))} checked={isSelected} />

         <p 
           id={`${_id}-name`} 
           aria-labelledby="name-col"
           style={{order: `${nameAreaOrder}`}}
           >
            {handleContactDetailsDisplay(`${firstName} ${lastName}`)}
         </p>

         <Link 
            to={`mailto:${email}`} 
            id={`${_id}-email`}
            aria-labelledby="email-col"
            style={{order: `${emailAreaOrder}`}}
            >
            {handleContactDetailsDisplay(email)}
         </Link>

         <p 
            id={`${_id}-phone`} 
            aria-labelledby="phone-col"
            style={{order: `${phoneAreaOrder}`}}
            >
            {handleContactDetailsDisplay(phoneNumber)}
         </p>

         {
            props.location === ContactItemLocation.Trash ?
            <p 
              aria-labelledby="deletedDate-col"
              id={`${_id}-deleteDate`} 
              style={{order: `${jobTitleAreaOrder}`}}
              >
               {new Date(deletedAt).toLocaleDateString('en-US')}
            </p>
            :
            <p 
               aria-labelledby="jobTitle-col"
               id={`${_id}-jobTitle`} 
               style={{order: `${jobTitleAreaOrder}`}}
               >
               {handleContactDetailsDisplay(`${jobTitle},${companyName}`)}
            </p>
         }

         {
            // don't show single contact actions when they are multi-selected
            !selectedContacts.length &&
            <div className="contact_action_icons">
               {
                  props.location === ContactItemLocation.Homepage ||
                  props.location === ContactItemLocation.LabelsPage ||
                  props.location === ContactItemLocation.Favourites ?
                  <>
                     <StarIconButton starred={inFavourites} handleStarring={() => handleStarring()} />
                     <EditIconButton navigateToEditPage={() => navigate(`c/edit/${_id}`)} />
                     <ContactMenu method="single" phoneNumber={phoneNumber} contactId={_id} contactLabels={labelledBy} />
                  </>
                  :
                  props.location === ContactItemLocation.HiddenContacts ?
                  <RestoreToActiveButton handleRestore={handleRestoreToActive} />
                  :
                  props.location === ContactItemLocation.Trash ?
                  <RestoreFromTrashButton handleRestore={handleRestoreFromTrash} />
                  :
                  props.location === ContactItemLocation.Duplicates ? 
                  <Button variant="contained" sx={{color:"#FAFAFA", bgColor:"hsl(182, 87%, 27%)"}}>Resolve</Button> 
                  :
                  null
               }  
            </div>         
         }
      </div>
   )
}

export default memo(ContactItem)