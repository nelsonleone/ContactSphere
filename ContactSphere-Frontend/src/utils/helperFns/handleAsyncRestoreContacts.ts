import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/slices/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/slices/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/slices/alertSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { IContactsFromDB, IServerResponseObj } from "../../vite-env";
import { setUpdatedLocalContacts } from "../../RTK/features/slices/userDataSlice";

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
   restoreMultipleContacts: RestoreMultipleContacts | null,
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
         const res = await restoreContactFromTrash({
            authUserUid: uid,
            contactId
         }).unwrap()

               
         if(!res){
            throw new Error("An Error Occured While During Restore")
         }

         // Update Contacts Data Locally Before Data Refetch
         const updatedLocalContactsData : IContactsFromDB[] = contacts.map(c => {
            return c._id === contactId ? { ...c,inTrash:false } : c
         })

         dispatch(setUpdatedLocalContacts(updatedLocalContactsData))
      }

      else if(method === "multi" && restoreMultipleContacts){
         const res = await restoreMultipleContacts({
            selectedContacts,
            authUserUid: uid
         }).unwrap()

         
         if(!res){
            throw new Error("An Error Occured While During Restore")
         }

         // Update Contacts Data Locally Before Data Refetch
         contacts.forEach(() => {
            const updatedLocalContactsData : IContactsFromDB[] = contacts.map(c => {
               return selectedContacts.includes(c._id) ? { ...c,inTrash:true } : c
            })

            dispatch(setUpdatedLocalContacts(updatedLocalContactsData))
         })
      }
      
      dispatch(setShowSnackbar({
         snackbarMessage:"Successfully Recovered"
      }))
   }


   catch(err:any){
      dispatch(setShowAlert({
         alertMessage: err.message || "Error Occured During Restoration",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}