import PhoneInput from 'react-phone-number-input'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import * as React from 'react'
import { Contact } from '../../src/vite-env'
import { InputPropertyValueName } from "../../src/enums";
import flags from 'react-phone-number-input/flags'
import 'react-phone-number-input/style.css'

interface IPhoneInputProps {
   register: UseFormRegister<Contact>,
   setValue: UseFormSetValue<Contact>,
   phoneNumber: string
}

export default function CustomPhoneInput(props:IPhoneInputProps){

   React.useEffect(() => {
      props.register(
         InputPropertyValueName.PhoneNumber,
         {
            required: "This Field Is Required",
            minLength: {
               value: 8,
               message: "Please check the phone number"
            }
         }
      )
   },[])

   const handlePhoneInputChange = (value:undefined) => {
      props.setValue(InputPropertyValueName.PhoneNumber,value ?  value : '')
   }

   return(
      <PhoneInput
         placeholder="Phone Number"
         defaultCountry="US"
         onChange={handlePhoneInputChange}
         className="phone_number_input"
         value={props.phoneNumber}
      />
   )
}