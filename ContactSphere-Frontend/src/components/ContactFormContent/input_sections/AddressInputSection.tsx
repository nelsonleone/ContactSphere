import { memo, useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { MdLocationOn } from 'react-icons/md'
import { addressSectionInputPropsArray } from "./inputPropsArray";
import { nanoid } from "@reduxjs/toolkit";


interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean,
   setValue: UseFormSetValue<Contact>,
   error:  string | undefined
}

function AddressInputSection(props:IProps){

   const { register, showMore , error } = props;
   const id = useId()

   return(
      <div className="dx_container address_section">
         {
            showMore &&
            <MdLocationOn />
         }
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
   )
}

export default memo(AddressInputSection)