import * as React from 'react'
import { UseFormRegister } from 'react-hook-form';
import { Contact } from "../../src/vite-env"
import { InputPropertyValueName } from '../../src/enums'

interface IFormInputProps {
   id: string,
   type: string,
   register:UseFormRegister<Contact>,
   label: string,
   placeholder: string,
   name: string
}

export default function NewContactFormInput(props:IFormInputProps){

   const {
      register,
      name,
      label,
      id,
      type,
      placeholder
   } = props;

   return(
      <div className="new_contact_form_input">
         <label htmlFor={id}>{label}</label>
         <input 
           type={type} 
           id={id} 
           {
            ...register(
                 InputPropertyValueName.,
                 {
                    required: name === 
                 }
               )
           }
           placeholder={placeholder} 
         />
      </div>
   )
}