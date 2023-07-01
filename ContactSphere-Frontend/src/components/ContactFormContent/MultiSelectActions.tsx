import { IconButton } from "@mui/material";
import { ContactManageLabelsButton, ContactMenuButton } from "../../../lib/with-tooltip";
import { MdOutlineRemoveCircle } from 'react-icons/md'
import { GoTriangleDown } from 'react-icons/go'
import { useAppSelector } from "../../customHooks/reduxCustomHooks";
import { MouseEvent, useState } from 'react'
import SimpleMenu from '../../../lib/popups/SimpleMenu'

export default function MultiSelectActions(){

   const { selectedContacts } = useAppSelector(store => store.multiSelect)

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   return(
      <div className="multi_select_actions">
         <div>
            <IconButton aria-label="remove">
               <MdOutlineRemoveCircle />
            </IconButton>
            <IconButton onClick={handleClick} aria-controls="multi-select-simple-menu" aria-haspopup="menu" aria-expanded={open ? "true" : "false"}>
               <GoTriangleDown />
            </IconButton>

            <SimpleMenu 
               anchorEl={anchorEl} 
               ariaLabelledBy="simple-menu-desc" 
               open={open} handleClose={()=> setAnchorEl(null)} 
               id="multi-select-simple-menu" 
               simpleMenuItems={[
                  "Select All",
                  "Remove All"
               ]}
            />
            <span className="AT_only" id="simple-menu-desc">Show Options On Selected Contacts</span>
            <span aria-label="selected Contact Count">{selectedContacts.length} selected</span>
         </div>

         <div>
            <ContactManageLabelsButton handleClick={() => console.log("h")} />
            <ContactMenuButton ariaControls="contact-mts-menu" ariaExpanded={true} tooltipText="More actions" />
         </div>
      </div>
   )
}