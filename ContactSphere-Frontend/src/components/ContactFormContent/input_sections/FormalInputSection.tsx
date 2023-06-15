import { useId } from "react";
import { InputPropertyValueName } from "../../../enums";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { UseFormRegister } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { BsBuildings } from 'react-icons/bs'

interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean
}


function FormalInputSection(props:IProps) {

   const id = useId()
   const { register, showMore } = props;

  return (
     <div className="dx_container formal_section">
         <BsBuildings />
         <NewContactFormInput
            label="Company"
            register={register}
            name={InputPropertyValueName.CompanyName}
            id={`${id}-company`}
            type="text"
            show={true}
         />
         <NewContactFormInput
            label="Job Title"
            register={register}
            name={InputPropertyValueName.JobTitle}
            id={`${id}-jobtitle`}
            type="text"
            show={true}
         />
         <NewContactFormInput
            label="Department"
            register={register}
            name={InputPropertyValueName.Department}
            id={`${id}-department`}
            type="text"
            show={showMore}
         />
     </div>
  )
}

export default FormalInputSection;