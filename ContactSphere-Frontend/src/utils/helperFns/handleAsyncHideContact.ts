import { Dispatch } from "@reduxjs/toolkit";
import { setHideWrkSnackbar, setShowWrkSnackbar } from "../../RTK/features/wrkSnackbarSlice";
import { setShowSnackbar } from "../../RTK/features/snackbarDisplaySlice";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { IContactsFromDB, IServerResponseObj } from "../../vite-env";
import { setSelectNone } from "../../RTK/features/contactMultiSelectSlice";
import { setUpdatedLocalContacts } from "../../RTK/features/userDataSlice";

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

      let res;

      if(method === "single"){
         res = await hideContact({
            authUserUid: uid,
            contactId,
            status
         }).unwrap()

         // Update Local State, Before Data Refetch
         const updatedLocalContacts = contacts.map(c => {
            return c._id === contactId ? {...c,isHidden:status} : c
         })

         console.log(updatedLocalContacts)
         dispatch(setUpdatedLocalContacts(updatedLocalContacts))
      }

      else if(method === "multi"){
         res = await hideMultipleContacts({
            selectedContacts,
            authUserUid: uid!,
            status
         }).unwrap()
      }

      if(!res){
         throw new Error("Internal Error")
      }

      
      dispatch(setSelectNone())

      contacts.forEach(val => {
         // Update Local State, Before Data Refetch
         const updatedLocalContacts = contacts.map(c => {
            return selectedContacts.includes(c._id) ? {...c,isHidden:status} : c
         })

         dispatch(setUpdatedLocalContacts(updatedLocalContacts))
      })

      dispatch(setShowSnackbar({
         snackbarMessage: status === true ? "Succefully Hidden" : "Succefully Unarchived"
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