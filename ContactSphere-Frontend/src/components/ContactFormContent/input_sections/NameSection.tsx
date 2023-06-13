import { useId } from "react";
import { nanoid } from "@reduxjs/toolkit";
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { UseFormRegister } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { CiUser } from 'react-icons/ci';
import { nameSectionInputPropsArray } from "./inputPropsArray";

interface IProps {
   register:UseFormRegister<Contact>,
   showMore: boolean
}

export default function NameInputSection(props:IProps){

   const {register, showMore } = props;
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
                     name={value.name}
                     id={`${id}-${value.id}`}
                     type={value.type}
                     show={showMore}
                  />
               )
            })
         }
      </div>
   )
}