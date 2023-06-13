import * as React from 'react'
import { UseFormRegister } from 'react-hook-form';
import { Contact } from "../../src/vite-env"
import { InputPropertyValueName } from '../../src/enums'

interface IFormInputProps {
   id: string,
   type: string,
   register:UseFormRegister<Contact>,
   label: string,
   name: string,
   show: boolean
}

export default function NewContactFormInput(props:IFormInputProps){

   const {
      register,
      name,
      label,
      id,
      type,
      show
   } = props;

   const isRequired = name === InputPropertyValueName.FirstName || name === InputPropertyValueName.PhoneNumber ? "This Field Is Required" : false;

   return(
      show ?
      <div className="new_contact_form_input">
         <label htmlFor={id}>{label}</label>
         <input 
           type={type} 
           id={id} 
           {
            ...register(
                 name as keyof Contact,
                 {
                    required: isRequired,
                 }
               )
           }
           placeholder={label} 
         />
      </div>
      :
      null
   )
}