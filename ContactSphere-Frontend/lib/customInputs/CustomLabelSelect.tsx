import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UseFormSetValue } from 'react-hook-form'
import { Contact, countryDataObj } from '../../src/vite-env.d'
import { nanoid } from '@reduxjs/toolkit';
import { relatedPeopleArray } from './relatedPeopleArray'
import { socialSites } from './socialSitesArray'
import fetchCountriesNameListData from '../../src/utils/helperFns/fetchCountriesData';
import { InputPropertyValueName } from '../../src/enums';



interface IProps {
   label: string,
   setValue: UseFormSetValue<Contact>,
   index?: number,
   selectFor: "social" | "relatedPeople" | "country"
   show: boolean,
   value: string,
}

export default function CustomLabelSelect(props:IProps) {

   const { show, label, setValue, value, index, selectFor} = props; 
   const [selectValue,setSelectValue] = React.useState(value)
   const [countriesNameListData,setCountriesNameListData] = React.useState<countryDataObj[]>()
   const getData = async() => {
      const data = await fetchCountriesNameListData()
      setCountriesNameListData(data)
   }

   React.useEffect(() => {
      getData()
   },[])

   // Manually Set Form Field Values From Select
   React.useEffect(() =>  {
      if(selectFor === "country"){
         setValue(InputPropertyValueName.AddressCountry as keyof Contact,selectValue)
      }
      else if(selectFor === "relatedPeople" && index){
         setValue(`relatedPeople[${index}].label` as keyof Contact,selectValue)
      }
      else if(selectFor === "social"){
         setValue(InputPropertyValueName.SocialSite as keyof Contact,selectValue)
      }
   },[selectValue])

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
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
         >
         {
            selectFor === "relatedPeople" ?
            relatedPeopleArray.map(value => (
               <MenuItem  key={nanoid()} value={value.value.toLowerCase()}>{value.text}</MenuItem>
            ))
            :
            selectFor === "country" ?
            countriesNameListData?.map(value => (
               <MenuItem  key={nanoid()} value={value.name.common.toLowerCase()}>{value.name.common}</MenuItem>
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
      </FormControl>
      :
      null
   )
}