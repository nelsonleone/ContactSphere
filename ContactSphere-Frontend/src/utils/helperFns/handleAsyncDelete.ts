import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

type DeleteContact = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   contactId: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", void, "contactsQueryApi">>


type DeleteMultiple = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   selectedContacts: string[];
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", void, "contactsQueryApi">>




export default async function handleAsyncDelete(
   deleteContact: DeleteContact,
   deleteMultiple: DeleteMultiple,
   method: "single" | "multi",
   uid: string,
   contactId: string,
   selectedContacts: string[],
   dispatch: Dispatch<any>

){
   try{
      dispatch(setShowWrkSnackbar())
      if(method === "single"){
         await deleteContact({
            authUserUid: uid,
            contactId
         })
      }

      else if(method === "multi"){
         await deleteMultiple({
            selectedContacts,
            authUserUid: uid
         })
      }
      
      dispatch(setShowSnackbar({
         snackbarMessage:"Successfully Deleted"
      }))
   }


   catch(err){
      dispatch(setShowAlert({
         alertMessage: "Error Occured During Deletion",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}