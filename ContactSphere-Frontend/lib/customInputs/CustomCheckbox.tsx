import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Select Contact Checkbox' } }

interface ICheckboxProps {
 checked: boolean,
 handleCheck: () => void
}

export default function CustomCheckbox(props:ICheckboxProps){
   return(
      <Checkbox
         {...label}
         checked={props.checked}
         onChange={props.handleCheck}
         className='custom-checkbox'
         sx={{
            color:  'hsl(0, 3%, 16%)',
            '&.Mui-checked': {
               color:  '#ff5100',
            },
         }}
      />
   )
}