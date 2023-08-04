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

type DeleteContact = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   contactId: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>


type DeleteMultiple = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   selectedContacts: string[];
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>



export default async function handleAsyncPermanentDelete(
  deleteContact: DeleteContact | null,
  deleteMultiple: DeleteMultiple | null,
  contactId: string,
  uid: string,
  method: "multi" | "single",
  dispatch: Dispatch<any>,
  contacts: IContactsFromDB[],
  selectedContacts: string[]
){
   try{
      dispatch(setShowWrkSnackbar())

      if(method === "single" && deleteContact){
         const res = await deleteContact({
            authUserUid: uid,
            contactId
         }).unwrap()

         
         if(!res){
            throw new Error("An Error Occured Completing Request")
         }

         // Update Contacts Data Locally Before Data Refetch
         const updatedLocalContactsData : IContactsFromDB[] = contacts.filter(c => {
            return c._id !== contactId
         })

         dispatch(setUpdatedLocalContacts(updatedLocalContactsData))
      }

      else if(method === "multi" && deleteMultiple){
         const res = await deleteMultiple({
            selectedContacts,
            authUserUid: uid
         })

         if(!res){
            throw new Error("An Error Occured Completing Request")
         }
         // Update Contacts Data Locally Before Data Refetch
         contacts.forEach(val => {
            const updatedLocalContactsData = contacts.filter(c => {
               return !selectedContacts.includes(c._id)
            })

            dispatch(setUpdatedLocalContacts(updatedLocalContactsData))
         })
      }

      dispatch(setSelectNone())
      
      dispatch(setShowSnackbar({
         snackbarMessage:"Successfully Deleted"
      }))
   }


   catch(err:any){
      dispatch(setShowAlert({
         alertMessage: err.message || "Error Occured During Deletion",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}