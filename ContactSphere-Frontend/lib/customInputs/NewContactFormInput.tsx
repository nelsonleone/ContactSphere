import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller, Control } from 'react-hook-form';
import { Contact } from "../../src/vite-env"
import { InputPropertyValueName } from '../../src/enums'

interface IFormInputProps {
   control: Control<Contact,any>,
   id: string,
   type: string,
   label: string,
   name: string,
   show: boolean,
   error?: string | undefined,
   helperText?: string,
   setShowLabelInput?: React.Dispatch<React.SetStateAction<number|null>>,
   index?: number,
   haveSelectedSite?: boolean,
   inputFor?: "socialHandle" | any
}

function NewContactFormInput(props:IFormInputProps){

   const {
      control,
      name,
      label,
      id,
      type,
      error,
      show,
      helperText,
      haveSelectedSite,
      inputFor
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
      <Controller
         name={name as keyof Contact}
         control={control}

         rules={{    
            required: isRequired,
            pattern: name === InputPropertyValueName.Birthday ?  birthdayPatternRule :
            name === InputPropertyValueName.AddressPostalCode ?  postalCodePatternRule :  /^.*$/
         }}

         render={
            ({ field }) => 
            
            <TextField
               className={inputFor === "socialHandle" && !haveSelectedSite ? "contact-input textField hide_input" : "contact-input textField"}
               error={
                  name === InputPropertyValueName.FirstName && error ||
                  name === InputPropertyValueName.AddressPostalCode && error || 
                  name === InputPropertyValueName.Birthday && error ? true : false
               }
               {...field}
               id={id}
               size="small"
               margin="dense"
               helperText={helperText ? helperText : ""}
               label={label}
               placeholder={label}
            />
         }
      />
      :
      null
   )
}

export default React.memo(NewContactFormInput)