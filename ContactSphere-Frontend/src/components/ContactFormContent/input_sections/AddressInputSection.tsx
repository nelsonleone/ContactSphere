import { memo, useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { MdLocationOn } from 'react-icons/md'
import { addressSectionInputPropsArray } from "./inputPropsArray";
import { nanoid } from "@reduxjs/toolkit";
import CustomLabelSelect from "../../../../lib/customInputs/CustomLabelSelect";


interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean,
   setValue: UseFormSetValue<Contact>,
   error:  string | undefined,
   country: string
}

function AddressInputSection(props:IProps){

   const { register, showMore , error, country , setValue} = props;
   const id = useId()

   return(
      <div className="address_input_section">
        <div className="dx_container address_section">
            {
               showMore &&
               <>
                  <MdLocationOn />
                  <CustomLabelSelect
                     setValue={setValue}
                     label="Country"
                     selectFor="country"
                     show={showMore}
                     value={country}
                  />
               </>
            }
         </div>
         <div>
            {
               addressSectionInputPropsArray.map(propValues => {
                  return(
                     <NewContactFormInput
                        key={nanoid()}
                        label={propValues.label}
                        register={register}
                        name={propValues.name}
                        id={`${id}-${propValues.id}`}
                        type={propValues.type}
                        show={showMore}
                        error={error}
                     />
                  )
               })
            }
         </div>
      </div>
   )
}

export default memo(AddressInputSection)