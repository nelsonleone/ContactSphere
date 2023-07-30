import { Dispatch } from "@reduxjs/toolkit"
import { updateLabels } from "../../RTK/features/slices/userDataSlice"
import { UserLabels } from "../../vite-env"
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/slices/wrkSnackbarSlice"
import { setShowAlert } from "../../RTK/features/slices/alertSlice"
import { AlertSeverity } from "../../enums"

export default async function postCreatedLabel(
   // add label is a mutation trigger for adding a label 
   addLabel: any,
   dispatch: Dispatch<any>,
   label: string,
   uid: string | null,
   )
   {


   try{
      dispatch(setShowWrkSnackbar())

      const labels:UserLabels = await addLabel({ authUserUid: uid,label }).unwrap()

      if(labels?.length){
         dispatch(updateLabels(labels))
      }
      else{
         throw new Error("Failed To Create Label, Try Again")
      }
   }

   catch(err:any){
      dispatch(setShowAlert({
         alertMessage: err.message || "Failed To Create Label",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
   
}