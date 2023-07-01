import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { nanoid } from '@reduxjs/toolkit';

interface IProps {
   id: string,
   open: boolean,
   handleClose: () => void,
   anchorEl: Element | null | undefined,
   simpleMenuItems: string[],
   ariaLabelledBy: string
}

function SimpleMenu(props:IProps) {

   const { handleClose, anchorEl, open, id, simpleMenuItems, ariaLabelledBy } = props;

   return (
         <Menu
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            className="simple-menu"
            MenuListProps={{
            'aria-labelledby': ariaLabelledBy || '',
         }}
         >
         {
            simpleMenuItems.map(item => (
               <MenuItem key={nanoid()} onClick={handleClose}>{item}</MenuItem>
            ))
         }
         </Menu>
   )
}

export default React.memo(SimpleMenu)