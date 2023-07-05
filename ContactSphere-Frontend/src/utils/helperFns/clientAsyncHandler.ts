import { Dispatch } from "@reduxjs/toolkit";
import { setShowAlert } from "../../RTK/features/alertSlice";
import { AlertSeverity } from "../../enums";

// Helper Fn To Catch Unhandled Errors
export default async function clientAsyncHandler(fn:() => Promise<any>,dispatch:Dispatch<any>){
   try{
      await fn()
   }
   catch(err:any|unknown){
      dispatch(setShowAlert({
         alertMessage: err.message,
         severity: AlertSeverity.ERROR
      }))
   }
}