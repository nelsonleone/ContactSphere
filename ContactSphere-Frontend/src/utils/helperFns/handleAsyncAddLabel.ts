import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { IContactsFromDB, IServerResponseObj } from "../../vite-env";
import { setEdittedContact } from "../../RTK/features/userDataSlice";

type ManageLabel = MutationTrigger<MutationDefinition<{
   label: string;
   authUserUid: string;
   contactId: string;
   actionType: "add" | "remove";
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IContactsFromDB, "contactsQueryApi">>

type ManageMultiContactsLabels = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   label: string;
   selectedContacts: string[];
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>




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


         if(!updatedContact){
            throw new Error("An Error Occured, Try Again")
         }
         // Update Specific Contact In State
         dispatch(setEdittedContact(updatedContact))
         
         dispatch(setShowSnackbar({
            snackbarMessage: actionType === "add" ?
            `${label} Label Have Been Set on ${phoneNumber}`
            :
            `${label} Label Have Been Removed ${method === "single" ? `from ${phoneNumber}` :""}`
         }))
      }

      else if(method === "multi"){
         const res = await manageMultiContactsLabels({
            authUserUid: uid,
            label,
            selectedContacts
         }).unwrap()

         if(!res){
            throw new Error("Internal Error Occured While Adding Label To Contacts")
         }

         dispatch(setShowSnackbar({
            snackbarMessage: actionType === "add" ?
            `${label} Label Have Been Set On Selected Contacts`
            :
            `${label} Label Have Been Removed From Selected Contacts`
         }))
      }

   }

   catch(err:any|unknown){
      dispatch(setShowAlert({
         alertMessage: err.message || "Error While Adding Label, Try Again" ,
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}