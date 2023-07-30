import { memo, useId } from "react";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { Control } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { MdLocationOn } from 'react-icons/md'
import { addressSectionInputPropsArray } from "./inputPropsArray";
import { nanoid } from "@reduxjs/toolkit";


interface IProps {
   control: Control<Contact,any>,
   showMore: boolean,
   error:  string | undefined,
}

function AddressInputSection(props:IProps){

   const { control, showMore , error } = props;
   const id = useId()

   return(
      <div className="dx_container">
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
                     control={control}
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