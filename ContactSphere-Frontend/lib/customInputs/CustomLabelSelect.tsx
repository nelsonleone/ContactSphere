import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UseFormRegister } from 'react-hook-form'
import { Contact } from '../../src/vite-env.d'

interface IProps {
   register: UseFormRegister<Contact>,
   name: string,
   label: string
}

export default function CustomLabelSelect(props:IProps) {

   const {  name, label, register } = props;

   return (
      <FormControl fullWidth className="custom_label_select">
         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {
               ...register(name as keyof Contact)
            }
            label={label}
            
         >
            <MenuItem value='assistant'>Assistant</MenuItem>
            <MenuItem value='brother'>Brother</MenuItem>
            <MenuItem value='child'>Child</MenuItem>
            <MenuItem value='friend'>Friend</MenuItem>
            <MenuItem value='father'>Father</MenuItem>
            <MenuItem value='manager'>Manager</MenuItem>
            <MenuItem value='mother'>Mother</MenuItem>
            <MenuItem value='parent'>Parent</MenuItem>
            <MenuItem value='relative'>Relative</MenuItem>
            <MenuItem value='reference'>Reference</MenuItem>
            <MenuItem value='partner'>Partner</MenuItem>
            <MenuItem value='sister'>Sister</MenuItem>
         </Select>
      </FormControl>
   )
}