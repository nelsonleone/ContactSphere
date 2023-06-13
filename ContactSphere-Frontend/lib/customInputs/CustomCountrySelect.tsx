import { useState, useEffect } from "react";
import { InputPropertyValueName } from "../../src/enums";
import { UseFormRegister } from "react-hook-form";
import { Contact, countryDataObj } from "../../src/vite-env";
import * as React from 'react'

interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean
}

export default function CustomCountrySelect(props:IProps){

   const { register, showMore } = props;
   const [countriesNameListData,setCountriesNameListData] = useState<countryDataObj[]>()

   const fetchCountriesNameListData = async() => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name")
      const resData = await res.json()
      setCountriesNameListData(resData)
   }

   useEffect(() => {
      fetchCountriesNameListData()
   },[])

   return(
      showMore ? 
      <select  className="country_select" placeholder="United States" {...register(InputPropertyValueName.AddressCountry,{ required: "Field cannot be blank" })}>
         {
            countriesNameListData?.length ? countriesNameListData?.map(value => {
               const countryName = value.name.common;
               return(
                  <option value={countryName} selected={countryName === "United States"}>{countryName}</option>
               )
            })
            :
            null
         }
      </select>
      :
      null
   )
}