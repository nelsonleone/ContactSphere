import { memo, useId } from "react";
import { InputPropertyValueName } from "../../../enums";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { GoMail } from 'react-icons/go'
import { BsTelephone } from 'react-icons/bs' 
import PhoneInput from '../../../../lib/customInputs/PhoneInput'

interface IProps {
   register:UseFormRegister<Contact>,
   setValue: UseFormSetValue<Contact>,
   phoneNumber: string
}

function ContactInputSection(props:IProps){

   const {
      register,
      setValue,
      phoneNumber
   } = props;

   const id = useId()

   return(
      <div className="contact_section">
         <div className="dx_container email_input_container">
            <GoMail />
            <NewContactFormInput
               label="Email"
               register={register}
               name={InputPropertyValueName.Email}
               id={`${id}-email`}
               type="text"
               show={true}
            />
         </div>

         <div className="dx_container phone_input_container">
            <BsTelephone />
            <PhoneInput phoneNumber={phoneNumber} setValue={setValue} register={register} />
         </div>
      </div>
   )
}

export default memo(ContactInputSection)