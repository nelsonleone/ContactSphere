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
   ariaLabelledBy: string,
   handleClick: (index:number) => void
}

function SimpleMenu(props:IProps) {

   const { handleClose, anchorEl, open, id, simpleMenuItems, ariaLabelledBy } = props;
   const handleLocalOnclick = (index:number) => {
      props.handleClick(index)
      handleClose()
   }

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
            simpleMenuItems.map((item,index) => (
               <MenuItem key={nanoid()} onClick={() => handleLocalOnclick(index)}>{item}</MenuItem>
            ))
         }
         </Menu>
   )
}

export default React.memo(SimpleMenu)