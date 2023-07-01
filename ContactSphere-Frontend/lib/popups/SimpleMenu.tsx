import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
      <div>
         <Menu
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': ariaLabelledBy || '',
         }}
         >
         {
            simpleMenuItems.map(item => (
               <MenuItem onClick={handleClose}>{item}</MenuItem>
            ))
         }
         </Menu>
      </div>
   )
}

export default React.memo(SimpleMenu)