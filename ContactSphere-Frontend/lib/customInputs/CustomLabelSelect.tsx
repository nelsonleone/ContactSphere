import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Contact } from '../../src/vite-env.d'
import { nanoid } from '@reduxjs/toolkit';
import { relatedPeopleArray } from './relatedPeopleArray'



interface IProps {
   register: UseFormRegister<Contact>,
   name: string,
   label: string,
   setValue: UseFormSetValue<Contact>,
   index: number,
   show: boolean,
}

export default function CustomLabelSelect(props:IProps) {

   const { register, show, label, name , setValue } = props;  

   return (
      show ?
      <FormControl className='custom_label_select'>
         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}
            size="small"
            className="select custom_select"
            {...register(name as keyof Contact)}
         >
         {
            relatedPeopleArray.map(value => (
               <MenuItem onClick={() => setValue(name as keyof Contact,value.value)} key={nanoid()} value={value.value.toLowerCase()}>{value.text}</MenuItem>
            ))
         }
         </Select>
      </FormControl>
      :
      null
   )
}