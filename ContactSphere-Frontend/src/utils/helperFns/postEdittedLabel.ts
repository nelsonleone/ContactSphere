import { Dispatch } from "@reduxjs/toolkit"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { AlertSeverity } from "../../enums";

type EditLabel =  MutationTrigger<MutationDefinition<{
   oldLabel: string;
   label: string;
   authUserUid: string;
   labelId: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", void, "contactsQueryApi">>

export default async function postEdittedLabel(
   editLabel: EditLabel,
   dispatch: Dispatch<any>,
   label: string,
   uid: string,
   labelId: string,
   oldLabel: string
   )
   {

   try{
      dispatch(setShowWrkSnackbar())
      await editLabel({ authUserUid: uid,label, labelId , oldLabel})
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