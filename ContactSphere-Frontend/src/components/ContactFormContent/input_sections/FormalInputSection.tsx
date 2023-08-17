import { useId } from "react";
import { formalDetailsPropArray } from './inputPropsArray'
import NewContactFormInput from "../../../../lib/customInputs/NewContactFormInput";
import { Control } from "react-hook-form";
import { Contact } from "../../../vite-env";
import { BsBuildings } from 'react-icons/bs'
import { nanoid } from '@reduxjs/toolkit'

interface IProps {
   control:Control<Contact,any>,
   showMore: boolean
}


function FormalInputSection(props:IProps) {

   const id = useId()
   const { control, showMore } = props;

  return (
     <div className="dx_container formal_section">
         <BsBuildings />
         {
            formalDetailsPropArray.map(val => (
               <NewContactFormInput
                  key={nanoid()}
                  label={val.label}
                  control={control}
                  name={val.name}
                  id={`${id}-${val.id}`}
                  type={val.type}
                  show={val.label === "Department" ? showMore : true}
            />
            ))
         }
     </div>
  )
}

export default FormalInputSection;