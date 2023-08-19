import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
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
   register: UseFormRegister<Contact>,
   setValue: UseFormSetValue<Contact>
}

export default function CustomLabelSelect(props:IProps) {

   const { show, label, register, selectFor, name, value, setValue} = props; 
   const [selectedValue,setSelectedValue] = React.useState(value)


   React.useEffect(() => {
      setValue(name as keyof Contact,selectedValue)
   },[selectedValue])

   return (
      show  ?
      <FormControl className='custom_label_select'>
         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}
            size="small"
            className="select custom_select"
            {...register(name as keyof Contact)}
            value={selectedValue}
         >
            {
               selectFor === "relatedPeople" ?
               relatedPeopleArray.map(value => (
                  <MenuItem  key={nanoid()} onClick={() => setSelectedValue(value.value?.toLocaleLowerCase())} value={value.value.toLowerCase()}>{value.text}</MenuItem>
               ))
               :
               selectFor === "social" ?
               socialSites.map(value => (
                  <MenuItem  key={nanoid()} onClick={() => setSelectedValue(value.name?.toLocaleLowerCase())} value={value.name.toLowerCase()}>{value.text}</MenuItem>
               ))
               :
               null
            }
         </Select>
      </FormControl>
      :
      null
   )
}