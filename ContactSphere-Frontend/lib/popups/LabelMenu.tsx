import * as React from 'react';
import Divider from '@mui/material/Divider';
import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { MdLabelOutline } from 'react-icons/md'
import { BiPlus } from 'react-icons/bi'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { UseFormRegister, Control, useFieldArray } from 'react-hook-form'
import { Contact } from '../../src/vite-env';
import { InputPropertyValueName } from '../../src/enums'


interface ILabelMenuProps { 
   showLabelMenu: boolean, 
   setShowLabelMenu:React.Dispatch<React.SetStateAction<boolean>>,
   register: UseFormRegister<Contact>,
   control:  Control<Contact, any>,
   setOpenAddLabelModal: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function LabelMenu(props:ILabelMenuProps) {
   
   const {
      showLabelMenu,
      setShowLabelMenu,
      control,
      setOpenAddLabelModal
   } = props;
   const { labels } = useAppSelector(state => state.userData)
   const { fields, append } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy })

   const handleClickAway = () => {
      setShowLabelMenu(false)
   }

   const handleAddLabel = (e:React.MouseEvent<HTMLButtonElement>,label:string) => {
      e.stopPropagation()
      const labelAlreadyAdded = fields.some(field => field.label === label)
      if (labelAlreadyAdded)return;

      append({label})
   }

   return (
      showLabelMenu ?
      <ClickAwayListener
         mouseEvent="onMouseDown"
         touchEvent="onTouchStart"
         onClickAway={handleClickAway}
         >
         <Paper sx={{ width: 220 }} className="label_menu">
            <MenuList>

               {
                     labels.length ? labels.map(value => (
                        <MenuItem className="label" key={value._id}>
                           <ListItemIcon>
                              <MdLabelOutline  />
                           </ListItemIcon>
                           <button type="button" onClick={(e) => handleAddLabel(e,value.label)}>{value.label}</button>
                        </MenuItem>
                     ))
                     :
                     <p>You have no saved <i>Label</i></p>
                  }
               <Divider />
               <MenuItem>
                 <ListItemIcon>
                   <BiPlus />
                 </ListItemIcon>
                 <button type="button" onClick={()  => setOpenAddLabelModal(prevState => prevState = !prevState)}>
                   <ListItemText style={{fontSize:'.9rem'}}>Create Label</ListItemText>
                  </button>
               </MenuItem>
            </MenuList>
         </Paper>
      </ClickAwayListener>
      :
      null
   )
}