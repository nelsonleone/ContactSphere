import { memo, useId } from "react";
import { nanoid } from "@reduxjs/toolkit";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { UseFormRegister } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { CiUser } from 'react-icons/ci';
import { nameSectionInputPropsArray } from "./inputPropsArray";
import { InputPropertyValueName } from "../../../enums";

interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean,
   error: string | undefined;
}

function NameInputSection(props:IProps){

   const { register, showMore, error } = props;
   const id = useId()

   return(
      <div className="dx_container name_section">
         <CiUser />

         {
            nameSectionInputPropsArray.map(value => {
               return(
                  <NewContactFormInput
                     key={nanoid()}
                     label={value.label}
                     register={register}
                     error={error}
                     name={value.name}
                     id={`${id}-${value.id}`}
                     type={value.type}
                     show={
                        value.name === InputPropertyValueName.FirstName || value.name === InputPropertyValueName.LastName ? 
                        true:
                        showMore
                     }
                  />
               )
            })
         }
      </div>
   )
}

export default memo(NameInputSection)