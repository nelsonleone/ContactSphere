import PhoneInput from 'react-phone-number-input'
import { Controller, Control } from 'react-hook-form'
import { Contact } from '../../src/vite-env'
import { InputPropertyValueName } from "../../src/enums";
import 'react-phone-number-input/style.css'

interface IPhoneInputProps {
   error: string | undefined,
   control: Control<Contact,any>
}

export default function CustomPhoneInput(props:IPhoneInputProps){

   return(
      <Controller
         name={InputPropertyValueName.PhoneNumber}
         control={props.control}
         rules={{ required: true }}
         render={
            ({ field }) => 
            <PhoneInput
               placeholder="Phone Number"
               defaultCountry="US"
               {...field}
               className={props.error ? "phone_number_input" : "phone_number_input error_phone_input"}
            />
         }
      />
   )
}