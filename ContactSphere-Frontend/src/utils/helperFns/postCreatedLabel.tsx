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


   const labels: UserLabels = addLabel({ authUserUid: uid,label }).unwrap()
   dispatch(updateLabels(labels))
}