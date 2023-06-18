import { useFieldArray, Control } from "react-hook-form"
import { Contact } from "../../../vite-env"
import { InputPropertyValueName } from "../../../enums"
import { MdLabelOutline } from "react-icons/md"

function AddedLabels({ control }: { control: Control<Contact,any> }) {

   const { fields:labelsArray, remove } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy }) 

   return (
      labelsArray ?
      <div className="added_labels_container">
         {
            labelsArray?.length &&
            labelsArray.map((value,index) => (
               <div key={value.id}>
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