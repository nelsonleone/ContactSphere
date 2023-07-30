import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/slices/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/slices/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/slices/alertSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { IContactsFromDB, IServerResponseObj } from "../../vite-env";
import { setSelectNone } from "../../RTK/features/slices/contactMultiSelectSlice";
import { setUpdatedLocalContacts } from "../../RTK/features/slices/userDataSlice";

type HideContact =  MutationTrigger<MutationDefinition<{
   authUserUid: string;
   contactId: string;
   status: boolean;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>

type HideMultipleContacts =  MutationTrigger<MutationDefinition<{
   authUserUid: string;
   selectedContacts: string[];
   status: boolean;
}, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IServerResponseObj, "contactsQueryApi">>



export default async function handleAsyncHideContact(
 dispatch: Dispatch<any>,
 method: "multi" | "single",
 contactId: string,
 status: boolean,
 uid: string,
 selectedContacts: string[],
 contacts: IContactsFromDB[],

//  Mutation Hooks Actions
  hideContact: HideContact,
  hideMultipleContacts: HideMultipleContacts
){
   try{
      dispatch(setShowWrkSnackbar())

      if(method === "single"){
         const res = await hideContact({
            authUserUid: uid,
            contactId,
            status
         }).unwrap()

         if(!res){
            throw new Error("Error Occured, Check Internet Connection and Try Again")
         }

         // Update Local State, Before Data Refetch
         const updatedLocalContacts = contacts.map(c => {
            return c._id === contactId ? {...c,isHidden:status} : c
         })


         dispatch(setUpdatedLocalContacts(updatedLocalContacts))
      }

      else if(method === "multi"){
         const res = await hideMultipleContacts({
            selectedContacts,
            authUserUid: uid!,
            status
         }).unwrap()

         if(!res){
            throw new Error("Error Occured, Check Internet Connection and Try Again")
         }

         dispatch(setSelectNone())

         contacts.forEach(val => {
            // Update Local State, Before Data Refetch
            const updatedLocalContacts = contacts.map(c => {
               return selectedContacts.some(j => j === c._id) ? {...c,isHidden:status} : c
            })
   
            dispatch(setUpdatedLocalContacts(updatedLocalContacts))
         })
      }

      dispatch(setShowSnackbar({
         snackbarMessage: status === true ? "Succefully Hidden" : "Succefully Restored"
      }))
   }

   catch(err:any){
      dispatch(setShowAlert({
         alertMessage: err.message || "Error Occured, Check Internet Connection and Try Again",
         severity: AlertSeverity.ERROR
      }))
   }

   finally{
      dispatch(setHideWrkSnackbar())
   }
}