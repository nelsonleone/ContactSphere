import { IconButton, Tooltip, Button } from "@mui/material";
import { MdOutlineRemoveCircle } from 'react-icons/md'
import { GoTriangleDown } from 'react-icons/go'
import { useAppSelector, useAppDispatch } from "../../customHooks/reduxCustomHooks";
import { MouseEvent, useState } from 'react'
import SimpleMenu from '../../../lib/popups/SimpleMenu'
import ContactMenu from "./ContactMenu";
import AddLabelDialog from "../../../lib/popups/AddLabelDialog";
import { setSelectAll, setSelectNone } from "../../RTK/features/slices/contactMultiSelectSlice";
import { useLocation } from "react-router-dom";
import { useHideContactMutation, useHideMultipleContactsMutation, useRestoreFromTrashMutation, useRestoreMultipleFromTrashMutation } from "../../RTK/features/api/injectedContactsApiQueries";
import clientAsyncHandler from "../../utils/helperFns/clientAsyncHandler";
import stopUnauthourizedActions from "../../utils/helperFns/stopUnauthourizedActions";
import handleAsyncHideContact from "../../utils/helperFns/handleAsyncHideContact";
import handleAsyncRestore from "../../utils/helperFns/handleAsyncRestoreContacts";
import { Duplicates, IContactsFromDB } from "../../vite-env";

export default function MultiSelectActions({contactsForMultiSelect}:{contactsForMultiSelect:IContactsFromDB[] | Duplicates}){

   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const { contacts } = useAppSelector(store => store.userData)
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const location = useLocation()
   const dispatch = useAppDispatch()
   const [hideMultipleContact] = useHideMultipleContactsMutation()
   const [hideContacts] = useHideContactMutation()
   const [openDialog,setOpenDialog] = useState(false)
   const [restoreContactFromTrash]= useRestoreFromTrashMutation()
   const [restoreMultiple] = useRestoreMultipleFromTrashMutation()
   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   const handleSimpleMenuItemClick = (index:number) => {
      if(index === 0){
         const contactsIds = contactsForMultiSelect.map(contact => contact._id)
         dispatch(setSelectAll(contactsIds))
      }
      else if(index === 1){
         dispatch(setSelectNone())
      }
   }

   const handleRestoreToActive = (from:'hidden'|'trash') => clientAsyncHandler(
      async() => {
         await stopUnauthourizedActions(uid)

         if(from === 'hidden'){
            await handleAsyncHideContact(
               dispatch,
               'multi',
               '',
               false,
               uid!,
               selectedContacts,
               contacts,
               hideContacts,
               hideMultipleContact

            )
         }else if(from === 'trash'){
            await handleAsyncRestore(
               restoreContactFromTrash,
               restoreMultiple,
               'multi',
               uid!,
               '',
               selectedContacts,
               dispatch,
               contacts
            )
         }
      },
      dispatch
   )

   return(
      <div className="multi_select_actions">
         <AddLabelDialog mode="create" open={openDialog} setOpen={setOpenDialog} />
         <div>
            <IconButton aria-label="remove" onClick={() => dispatch(setSelectNone())}>
               <MdOutlineRemoveCircle />
            </IconButton>
            <Tooltip title="Selection actions">
               <IconButton onClick={handleClick} aria-controls="multi-select-simple-menu" aria-haspopup="menu" aria-expanded={open ? "true" : "false"}>
                  <GoTriangleDown />
               </IconButton>
            </Tooltip>

            <SimpleMenu 
               anchorEl={anchorEl} 
               handleClick={handleSimpleMenuItemClick}
               ariaLabelledBy="simple-menu-desc" 
               open={open} handleClose={()=> setAnchorEl(null)} 
               id="multi-select-simple-menu" 

               simpleMenuItems={[
                  "Select All",
                  "None"
               ]}
            />
            <span className="AT_only" id="simple-menu-desc">Show Options On Selected Contacts</span>
            <span aria-label="selected Contact Count">{selectedContacts.length} selected</span>
         </div>
         <div>
            {
               location.pathname !== "/hidden" && location.pathname !== "/trash" ?
               <ContactMenu method="multi" id="contact-mts-menu" setOpenDialog={setOpenDialog}  />
               :
               location.pathname === "/hidden" ? 
               <Button className="unarchive_btn" onClick={() => handleRestoreToActive('hidden')}>Restore Contacts</Button>
               :
               location.pathname === "/trash" ? 
               <Button className="rft_btn" onClick={() => handleRestoreToActive('trash')}>Remove From Trash</Button>
               :
               null
            }
         </div>
      </div>
   )
}