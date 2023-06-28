import * as React from 'react';
import TextField from '@mui/material/TextField';
import { UseFormRegister } from 'react-hook-form';
import { Contact } from "../../src/vite-env"
import { InputPropertyValueName } from '../../src/enums'

interface IFormInputProps {
   id: string,
   type: string,
   register:UseFormRegister<Contact>,
   label: string,
   name: string,
   show: boolean,
   error?: string | undefined,
   helperText?: string,
   setShowLabelInput?: React.Dispatch<React.SetStateAction<number|null>>,
   index?: number
}

function NewContactFormInput(props:IFormInputProps){

   const {
      register,
      name,
      label,
      id,
      type,
      error,
      show,
      helperText
   } = props;
   
   const isRequired = name === InputPropertyValueName.FirstName || 
      name === InputPropertyValueName.PhoneNumber
      ? "This Field Is Required" : false
   ;

   const postalCodePatternRule = {
      value:  /^\d+$/,
      message: 'Enter A valid Postal Code'
   }

   const birthdayPatternRule = {
      value: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
      message: "Use The Provided Format"
   }

   return(
      show && type === "text" ?
      <TextField
         className="contact-input textField"
         error={
            name === InputPropertyValueName.FirstName && error ||
            name === InputPropertyValueName.AddressPostalCode && error || 
            name === InputPropertyValueName.Birthday && error ? true : false
         }
         id={id}
         size="small"
         margin="dense"
         helperText={helperText ? helperText : ""}
         {
            ...register(
               name as keyof Contact,
               {
                  required: isRequired,
                  pattern: name === InputPropertyValueName.Birthday ?  birthdayPatternRule :
                  name === InputPropertyValueName.AddressPostalCode ?  postalCodePatternRule :  /^.*$/
               }
            )
         }
         label={label}
         placeholder={label}
      />
      :
      null
   )
}

export default React.memo(NewContactFormInput)