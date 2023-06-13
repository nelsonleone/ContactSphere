import { useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import CustomCountrySelect from "../../../../lib/customInputs/CustomCountrySelect";
import { UseFormRegister } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { MdLocationOn } from 'react-icons/md'
import { addressSectionInputPropsArray } from "./inputPropsArray";
import { nanoid } from "@reduxjs/toolkit";


interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean
}

export default function AddressInputSection(props:IProps){

   const { register, showMore } = props;
   const id = useId()

   return(
      <div className="address_section">
         <MdLocationOn />
         <CustomCountrySelect register={register} showMore={showMore} />

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
                  />
               )
            })
         }
      </div>
   )
}