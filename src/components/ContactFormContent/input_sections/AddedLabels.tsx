import { useFieldArray, UseFieldArrayRemove, Control, UseFormSetValue } from "react-hook-form"
import { Contact } from "../../../vite-env"
import { AlertSeverity, InputPropertyValueName } from "../../../enums"
import { nanoid } from "@reduxjs/toolkit"
import { memo } from 'react'
import { useAppDispatch, useAppSelector } from "../../../customHooks/reduxCustomHooks"
import stopUnauthourizedActions from "../../../utils/helperFns/stopUnauthourizedActions"
import handleAsyncAddLabel from "../../../utils/helperFns/handleAsyncAddLabel"
import { setShowAlert } from "../../../RTK/features/slices/alertSlice"
import { useManageLabelsMutation } from "../../../RTK/features/api/injectedContactsApiQueries"

interface IProps { 
   control?:  Control<Contact,any>, 
   labelsArray:{label:string}[] , 
   setValue?:UseFormSetValue<Contact>,
   contactId?: string,
   phoneNumber?: string
}

function AddedLabels(props:IProps) {

   const { control, labelsArray, setValue, phoneNumber, contactId } = props;
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const dispatch = useAppDispatch()
   const [manageLabels] = useManageLabelsMutation()

   let remove:UseFieldArrayRemove;
   if (control){
      remove  = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy }).remove;
   }


   const handleClick = async(index:number,label:string) => {
     if(setValue && control){
         setValue(`${InputPropertyValueName.LabelledBy}.${index}.label`,'')
         remove(index)
         return;
      }

      // AddedLabels Component being used in contact view page
      else if(contactId && phoneNumber){
         try{
            if(!contactId || !phoneNumber){
               throw new Error("Incomplete properties passed, 'contactId or phoneNumber was not passed'")
            }
            await stopUnauthourizedActions(uid)
            await handleAsyncAddLabel(
               dispatch,
               "remove",
               contactId,
               uid!,
               "single",
               [],
               label,
               phoneNumber,
               manageLabels,
               null
            )
         }
         catch(err:any|unknown){
            dispatch(setShowAlert({
               alertMessage: err.message || "Error Occured Adding Label",
               severity: AlertSeverity.ERROR
            }))
         }
      }
   }

   return (
      labelsArray ?
      <div className="added_labels_container">
         {
            labelsArray?.length ?
            labelsArray.map((value,index) => (
               <div key={nanoid()}>
                  <button onClick={() => handleClick(index,value.label)}>
                     <span>{value.label}</span>
                  </button>
               </div>
            ))
            :
            null
         }
      </div>
      :
      null
   )
}

export default memo(AddedLabels)