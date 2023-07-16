import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { setSelectNone } from "../../RTK/features/contactMultiSelectSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { IContactsFromDB, IServerResponseObj } from "../../vite-env";
import { setUpdatedLocalContacts } from "../../RTK/features/userDataSlice";

type DeleteContact = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   contactId: string;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>


type DeleteMultiple = MutationTrigger<MutationDefinition<{
   authUserUid: string;
   selectedContacts: string[];
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>



export default async function handleAsyncPermanentDelete(
  deleteContact: DeleteContact,
  deleteMultiple: DeleteMultiple,
  contactId: string,
  uid: string,
  method: "multi" | "single",
  dispatch: Dispatch<any>,
  contacts: IContactsFromDB[],
  selectedContacts: string[]
){
   try{
      dispatch(setShowWrkSnackbar())

      let res;

      if(method === "single"){
         res = await deleteContact({
            authUserUid: uid,
            contactId
         }).unwrap()

         // Update Contacts Data Locally Before Data Refetch
         const updatedLocalContactsData : IContactsFromDB[] = contacts.map(c => {
            return c._id === contactId ? { ...c,inTrash:true } : c
         })

         dispatch(setUpdatedLocalContacts(updatedLocalContactsData))
      }

      else if(method === "multi"){
         res = await deleteMultiple({
            selectedContacts,
            authUserUid: uid
         })

         // Update Contacts Data Locally Before Data Refetch
         contacts.forEach(val => {
            const updatedLocalContactsData : IContactsFromDB[] = contacts.map(c => {
               return selectedContacts.includes(c._id) ? { ...c,inTrash:true } : c
            })

            dispatch(setUpdatedLocalContacts(updatedLocalContactsData))
         })
      }

      if(!res){
         throw new Error("An Error Occured Completing Request")
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