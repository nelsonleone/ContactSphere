import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Select Contact Checkbox' } }

interface ICheckboxProps {
 checked: boolean,
 handleCheck: () => void,
 color?: string,
 disabled?: boolean,
 size?: "small"|"medium"
}

export default function CustomCheckbox(props:ICheckboxProps){
   return(
      <Checkbox
         {...label}
         checked={props.checked}
         onChange={props.handleCheck}
         className='custom-checkbox'
         size={props.size || 'medium'}
         disabled={props.disabled ? true : false}
         sx={{
            color:  '#2a2828a9',
            '&.Mui-checked': {
               color: props.color || '#ff5100',
            },
         }}
      />
   )
}