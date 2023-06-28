import { Dispatch } from "@reduxjs/toolkit"
import { updateLabels } from "../../RTK/features/userDataSlice"
import { UserLabels } from "../../vite-env"

export default async function postCreatedLabel(
   // add label is a mutation trigger for adding a label 
   addLabel: any,
   dispatch: Dispatch<any>,
   label: string,
   uid: string | null,
   )
   {


   const labels: UserLabels = await addLabel({ authUserUid: uid,label }).unwrap()
   
   if(labels?.length){
      // A No Content Response Is Sent When The Label Already Exist, Therefore No Response Data
      dispatch(updateLabels(labels))
   }
}