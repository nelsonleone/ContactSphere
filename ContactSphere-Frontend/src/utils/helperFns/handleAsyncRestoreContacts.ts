import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { IServerResponseObj } from "../../vite-env";

type RestoreContact = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   contactId: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>


type RestoreMultipleContacts = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   selectedContacts: string[];
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>




export default async function handleAsyncRestore(
   restoreContactFromTrash: RestoreContact,
   restoreMultipleContacts: RestoreMultipleContacts,
   method: "single" | "multi",
   uid: string,
   contactId: string,
   selectedContacts: string[],
   dispatch: Dispatch<any>

){
   try{
      dispatch(setShowWrkSnackbar())
      let res;

      if(method === "single"){
         res = await restoreContactFromTrash({
            authUserUid: uid,
            contactId
         }).unwrap()
      }

      else if(method === "multi"){
         res = await restoreMultipleContacts({
            selectedContacts,
            authUserUid: uid
         }).unwrap()
      }

      if(!res){
         throw new Error("An Error Occured While During Restore")
      }
      
      dispatch(setShowSnackbar({
         snackbarMessage:"Successfully Restored"
      }))
   }


   catch(err){
      dispatch(setShowAlert({
         alertMessage: "Error Occured During Restoration",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}