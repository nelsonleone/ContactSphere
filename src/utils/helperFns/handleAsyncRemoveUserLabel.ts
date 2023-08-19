import { Dispatch } from "@reduxjs/toolkit"
import { setShowAlert } from "../../RTK/features/slices/alertSlice"
import { setShowSnackbar } from "../../RTK/features/slices/snackbarDisplaySlice"
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/slices/wrkSnackbarSlice"
import { AlertSeverity } from "../../enums"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { UserLabels } from "../../vite-env"
import { updateLabels } from "../../RTK/features/slices/userDataSlice"

type RemoveLabel = MutationTrigger<MutationDefinition<{
   label: string;
   authUserUid: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", UserLabels, "contactsQueryApi">>


export default async function handleAsyncRemoveUserLabel(
   removeLabel: RemoveLabel,
   uid: string,
   dispatch: Dispatch<any>,
   label: string
){
   try{
      dispatch(setShowWrkSnackbar())
      const labels = await removeLabel({label, authUserUid:uid}).unwrap()

      dispatch(updateLabels(labels))

      dispatch(setShowSnackbar({
         snackbarMessage: `${label} Label have been deleted`
      }))
   }
   catch(err){
      dispatch(setShowAlert({
         alertMessage: "Error Occured Deleting Label,Try Again",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}