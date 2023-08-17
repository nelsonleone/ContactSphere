import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Control, Controller } from 'react-hook-form'
import { Contact } from '../../src/vite-env.d'
import { nanoid } from '@reduxjs/toolkit';
import { relatedPeopleArray } from './relatedPeopleArray'
import { socialSites } from './socialSitesArray'



interface IProps {
   label: string,
   selectFor: "social" | "relatedPeople"
   show: boolean,
   value: string,
   name: string,
   control: Control<Contact,any>
}

export default function CustomLabelSelect(props:IProps) {

   const { show, label, control, selectFor, name, value} = props; 

   return (
      show  ?
      <FormControl className='custom_label_select'>
         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
         <Controller
            name={name as keyof Contact}
            control={control}

            render={
               ({ field }) => 
               
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={label}
                  size="small"
                  className="select custom_select"
                  {...field}
                  value={value}
               >
                  {
                     selectFor === "relatedPeople" ?
                     relatedPeopleArray.map(value => (
                        <MenuItem  key={nanoid()} value={value.value.toLowerCase()}>{value.text}</MenuItem>
                     ))
                     :
                     selectFor === "social" ?
                     socialSites.map(value => (
                        <MenuItem  key={nanoid()} value={value.name.toLowerCase()}>{value.text}</MenuItem>
                     ))
                     :
                     null
                  }
               </Select>
            }
      />
      </FormControl>
      :
      null
   )
}