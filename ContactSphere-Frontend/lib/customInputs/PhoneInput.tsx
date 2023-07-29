import PhoneInput from 'react-phone-number-input'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import * as React from 'react'
import { Contact } from '../../src/vite-env'
import { InputPropertyValueName } from "../../src/enums";
import 'react-phone-number-input/style.css'

interface IPhoneInputProps {
   register: UseFormRegister<Contact>,
   setValue: UseFormSetValue<Contact>,
   phoneNumber: string,
   error: string | undefined
}

export default function CustomPhoneInput(props:IPhoneInputProps){

   const [autoFocus,setAutoFocus] = React.useState(props.error ? true : false)

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

   React.useEffect(() => {
      setAutoFocus(props.error ? true : false)
   },[props.error])


   const handlePhoneInputChange = (value:undefined) => {
      props.setValue(InputPropertyValueName.PhoneNumber,value ?  value : '')
   }

   return(
      <PhoneInput
         placeholder="Phone Number"
         defaultCountry="US"
         onChange={handlePhoneInputChange}
         className={props.error ? "phone_number_input" : "phone_number_input error_phone_input"}
         value={props.phoneNumber}
         autoFocus={autoFocus}
      />
   )
}