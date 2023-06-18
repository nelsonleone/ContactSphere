import { useFieldArray, Control } from "react-hook-form"
import { Contact } from "../../../vite-env"
import { InputPropertyValueName } from "../../../enums"

function AddedLabels({ control }: { control: Control<Contact,any> }) {

   const { fields:labelsArray } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy }) 

   return (
      labelsArray ?
      <div className="added_labels_container">
         {
            labelsArray?.length &&
            labelsArray.map(label => (
               <div>
                  <button>
                     <Md
                     <span>{label}</span>
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