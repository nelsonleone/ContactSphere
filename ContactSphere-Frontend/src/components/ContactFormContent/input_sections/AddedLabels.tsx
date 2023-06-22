import { useFieldArray, Control } from "react-hook-form"
import { Contact } from "../../../vite-env"
import { InputPropertyValueName } from "../../../enums"
import { MdLabelOutline } from "react-icons/md"
import { nanoid } from "@reduxjs/toolkit"

function AddedLabels({ control, labelsArray }: { control: Control<Contact,any>, labelsArray: {label:string}[]}) {

   const { remove } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy }) 

   return (
      labelsArray ?
      <div className="added_labels_container">
         {
            labelsArray?.length &&
            labelsArray.map((value,index) => (
               <div key={nanoid()}>
                  <button onClick={() => remove(index)}>
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

export default AddedLabels;