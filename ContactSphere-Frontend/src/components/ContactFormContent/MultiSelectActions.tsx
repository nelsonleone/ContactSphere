import { IconButton, Tooltip } from "@mui/material";
import { MdOutlineRemoveCircle } from 'react-icons/md'
import { GoTriangleDown } from 'react-icons/go'
import { useAppSelector, useAppDispatch } from "../../customHooks/reduxCustomHooks";
import { MouseEvent, useState } from 'react'
import SimpleMenu from '../../../lib/popups/SimpleMenu'
import ContactMenu from "./ContactMenu";
import AddLabelDialog from "../../../lib/popups/AddLabelDialog";
import { setSelectAll, setSelectNone } from "../../RTK/features/contactMultiSelectSlice";

export default function MultiSelectActions(){

   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const { contacts } = useAppSelector(store => store.userData)
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const dispatch = useAppDispatch()
   const [openDialog,setOpenDialog] = useState(false)
   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   const handleSimpleMenuItemClick = (index:number) => {
      if(index === 0){
         const contactsIds = contacts.map(contact => contact._id)
         dispatch(setSelectAll(contactsIds))
      }
      else if(index === 1){
         dispatch(setSelectNone())
      }
   }

   return(
      <div className="multi_select_actions">
         <AddLabelDialog open={openDialog} setOpen={setOpenDialog} />
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
           <ContactMenu method="multi" id="contact-mts-menu" />
         </div>
      </div>
   )
}