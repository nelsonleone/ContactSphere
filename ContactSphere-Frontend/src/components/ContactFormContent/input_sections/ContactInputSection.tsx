import { memo, useId } from "react";
import { InputPropertyValueName } from "../../../enums";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { Control } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { GoMail } from 'react-icons/go'
import { BsTelephone } from 'react-icons/bs' 
import PhoneInput from '../../../../lib/customInputs/PhoneInput'

interface IProps {
   error: string | undefined,
   control: Control<Contact,any>
}

function ContactInputSection(props:IProps){

   const {
      error,
      control
   } = props;

   const id = useId()

   return(
      <div className="contact_section">
         <div className="dx_container email_input_container">
            <GoMail />
            <NewContactFormInput
               label="Email"
               control={control}
               name={InputPropertyValueName.Email}
               id={`${id}-email`}
               type="text"
               show={true}
            />
         </div>

         <div className="dx_container phone_input_container">
            <BsTelephone />
            <PhoneInput control={control} error={error} />
         </div>
      </div>
   )
}

export default memo(ContactInputSection)