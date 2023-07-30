import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/slices/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/slices/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/slices/alertSlice";
import { setSelectNone } from "../../RTK/features/slices/contactMultiSelectSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { IContactsFromDB, IServerResponseObj } from "../../vite-env";
import { setUpdatedLocalContacts } from "../../RTK/features/slices/userDataSlice";

type SendToTrash = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   contactId: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>


type SendMultipleToTrash = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   selectedContacts: string[];
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>




export default async function handleAsyncDelete(
   sendToTrash: SendToTrash,
   sendMultipleToTrash: SendMultipleToTrash,
   method: "single" | "multi",
   uid: string,
   contactId: string,
   selectedContacts: string[],
   dispatch: Dispatch<any>,
   contacts: IContactsFromDB[]

){
   try{
      dispatch(setShowWrkSnackbar())

      if(method === "single"){
         const res = await sendToTrash({
            authUserUid: uid,
            contactId
         }).unwrap()

         
         if(!res){
            throw new Error("An Error Occured Completing Request")
         }

         // Update Contacts Data Locally Before Data Refetch
         const updatedLocalContactsData : IContactsFromDB[] = contacts.map(c => {
            return c._id === contactId ? { ...c,inTrash:true, deletedAt: new Date().toISOString() } : c
         })

         dispatch(setUpdatedLocalContacts(updatedLocalContactsData))
      }

      else if(method === "multi"){
         const res = await sendMultipleToTrash({
            selectedContacts,
            authUserUid: uid
         })

         
         if(!res){
            throw new Error("An Error Occured Completing Request")
         }

         // Update Contacts Data Locally Before Data Refetch
         contacts.forEach(val => {
            const updatedLocalContactsData : IContactsFromDB[] = contacts.map(c => {
               return selectedContacts.includes(c._id) ? { ...c,inTrash:true, deletedAt: new Date().toISOString() } : c
            })

            dispatch(setUpdatedLocalContacts(updatedLocalContactsData))
         })
      }

      dispatch(setSelectNone())
      
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