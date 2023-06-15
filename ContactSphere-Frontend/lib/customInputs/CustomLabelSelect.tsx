import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Contact, countryDataObj } from '../../src/vite-env.d'
import { nanoid } from '@reduxjs/toolkit';
import { relatedPeopleArray } from './relatedPeopleArray'

interface IProps {
   register: UseFormRegister<Contact>,
   name: string,
   label: string,
   setValue: UseFormSetValue<Contact>,
   index: number,
   show: boolean,
   labelFor: string
}

export default function CustomLabelSelect(props:IProps) {

   const { register, show, label, name , setValue, labelFor} = props;
   const [countriesNameListData,setCountriesNameListData] = React.useState<countryDataObj[]>()
   const [localValue,setLocalValue] = React.useState<string>("")

   const fetchCountriesNameListData = async() => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name")
      const resData = await res.json()
      setCountriesNameListData(resData)
   }

   React.useEffect(() => {
      register(name as keyof Contact)
      fetchCountriesNameListData()
   },[])
   

   const handleChange = (e:SelectChangeEvent<string>) => {
      const value = e.target.value;

      if(value){
         setValue(name as keyof Contact,value)
      }
   }

   return (
      show ?
      <FormControl className={`${labelFor} custom_label_select`}>
         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            label={label}
            size="small"
            value={localValue}
            className={`${labelFor}-select`}
         >
            {
               labelFor === "country_select" && countriesNameListData?.length ?
               countriesNameListData?.map(value => (
                  <MenuItem onClick={() => setLocalValue(value.name.common)} key={nanoid()} value={value.name.common.toLowerCase()}>{value.name.common}</MenuItem>
               ))

               :

               relatedPeopleArray.map(value => (
                  <MenuItem onClick={() => setLocalValue(value.value)} key={nanoid()} value={value.value.toLowerCase()}>{value.text}</MenuItem>
               ))
            }
         </Select>
      </FormControl>
      :
      null
   )
}