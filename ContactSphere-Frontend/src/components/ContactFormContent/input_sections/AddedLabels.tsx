import { useFieldArray, Control, UseFormSetValue } from "react-hook-form"
import { Contact } from "../../../vite-env"
import { InputPropertyValueName } from "../../../enums"
import { MdLabelOutline } from "react-icons/md"
import { nanoid } from "@reduxjs/toolkit"
import { memo } from 'react'

function AddedLabels({ control, labelsArray, setValue }: { setValue:UseFormSetValue<Contact>, control: Control<Contact,any>, labelsArray: {label:string}[]}) {

   const { remove } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy }) 

   const handleClick = (index:number) => {
      setValue(`${InputPropertyValueName.LabelledBy}.${index}.label`,'')
      remove(index)
   }

   return (
      labelsArray ?
      <div className="added_labels_container">
         {
            labelsArray?.length &&
            labelsArray.map((value,index) => (
               <div key={nanoid()}>
                  <button onClick={() => handleClick(index)}>
                     <MdLabelOutline />
                     <span>{value.label}</span>
                  </button>
               </div>
            ))
         }
      </div>
      :
      null
   )
}

export default memo(AddedLabels)