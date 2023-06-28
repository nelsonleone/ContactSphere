import { useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import CustomLabelSelect from "../../../../lib/customInputs/CustomLabelSelect";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { MdLocationOn } from 'react-icons/md'
import { addressSectionInputPropsArray } from "./inputPropsArray";
import { nanoid } from "@reduxjs/toolkit";
import { InputPropertyValueName } from "../../../enums";


interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean,
   setValue: UseFormSetValue<Contact>,
   error:  string | undefined
}

export default function AddressInputSection(props:IProps){

   const { register, showMore , error, setValue} = props;
   const id = useId()

   return(
      <div className="dx_container address_section">
         {
            showMore &&
            <MdLocationOn />
         }
         <CustomLabelSelect
            index={0}
            labelFor="country_select" 
            register={register} 
            show={showMore} 
            label="Country" 
            name={InputPropertyValueName.AddressCountry} 
            setValue={setValue}
         />

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