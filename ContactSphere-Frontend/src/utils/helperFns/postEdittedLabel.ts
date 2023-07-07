import { Dispatch } from "@reduxjs/toolkit"
import { updateLabels } from "../../RTK/features/userDataSlice"
import { UserLabels } from "../../vite-env"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { AlertSeverity } from "../../enums";

type EditLabel =  MutationTrigger<MutationDefinition<{
   label: string;
   authUserUid: string;
   labelId: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", UserLabels, "contactsQueryApi">>

export default async function postEdittedLabel(
   editLabel: EditLabel,
   dispatch: Dispatch<any>,
   label: string,
   uid: string,
   labelId: string
   )
   {

   try{
      dispatch(setShowWrkSnackbar())
      const labels:UserLabels = await editLabel({ authUserUid: uid,label, labelId }).unwrap()

      dispatch(updateLabels(labels))

      dispatch(setShowSnackbar({
         snackbarMessage: "Label Editted Successfully"
      }))
   }

   catch(err){
      dispatch(setShowAlert({
         alertMessage: "An Error Occured, Try Again",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}