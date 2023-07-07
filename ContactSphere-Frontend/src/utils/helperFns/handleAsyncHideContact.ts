import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";

type HideContact =  MutationTrigger<MutationDefinition<{
   authUserUid: string;
   contactId: string;
   status: boolean;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", void, "contactsQueryApi">>

type HideMultipleContacts =  MutationTrigger<MutationDefinition<{
   authUserUid: string;
   selectedContacts: string[];
   status: boolean;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", void, "contactsQueryApi">>



export default async function handleAsyncHideContact(
 dispatch: Dispatch<any>,
 method: "multi" | "single",
 contactId: string,
 status: boolean,
 uid: string,
 selectedContacts: string[],

//  Mutation Hooks Actions
  hideContact: HideContact,
  hideMultipleContacts: HideMultipleContacts
){
   try{
      dispatch(setShowWrkSnackbar())

      if(method === "single"){
         await hideContact({
            authUserUid: uid,
            contactId,
            status
         })
      }

      else if(method === "multi"){
         await hideMultipleContacts({
            selectedContacts,
            authUserUid: uid!,
            status: true
         })
      }

      dispatch(setShowSnackbar({
         snackbarMessage:"Succefully Hidden"
      }))
   }

   catch(err){
      dispatch(setShowAlert({
         alertMessage: "Error Occured, Check Internet Connection and Try Again",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}