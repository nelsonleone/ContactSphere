import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { IContactsFromDB } from "../../vite-env";
import { setEdittedContact } from "../../RTK/features/userDataSlice";

type ManageLabel = MutationTrigger<MutationDefinition<{
   label: string;
   authUserUid: string;
   contactId: string;
   actionType: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IContactsFromDB, "contactsQueryApi">>

type ManageMultiContactsLabels= MutationTrigger<MutationDefinition<{
   authUserUid: string;
   label: string;
   selectedContacts: string[];
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", void, "contactsQueryApi">>




export default async function handleAsyncAddLabel(
   dispatch: Dispatch<any>,
   actionType: "add" | "remove",
   contactId: string,
   uid: string,
   method: "single" | "multi",
   selectedContacts: string[],
   label: string,
   phoneNumber: string,
  
  //  Mutation Hooks Actions
  manageLabels: ManageLabel,
   manageMultiContactsLabels: ManageMultiContactsLabels
){
   
   // Contact Menu Used In Individual Contacts
   try{
      dispatch(setShowWrkSnackbar())
      if(!uid){
         throw new Error("Unauthourized request, please login")
      }

      if(contactId && method === "single"){
         const updatedContact = await manageLabels({
            authUserUid: uid,
            label,
            contactId,
            actionType
         }).unwrap()

         // Update Specific Contact In State
         dispatch(setEdittedContact(updatedContact))
      }
      else if(method === "multi"){
         await manageMultiContactsLabels({
            authUserUid: uid,
            label,
            selectedContacts
         })
      }

      dispatch(setShowSnackbar({
         snackbarMessage: `${label} Label Has Been Set ${method === "single" ? "on" + phoneNumber :""}`
      }))
   }

   catch(err:any|unknown){
      dispatch(setShowAlert({
         alertMessage: err.message,
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}