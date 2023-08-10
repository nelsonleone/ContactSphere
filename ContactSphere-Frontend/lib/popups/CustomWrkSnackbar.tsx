import * as React from 'react'
import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'


export default function CustomWrkSnackbar(){

   const { showWrkSnackbar } = useAppSelector(store => store.wrkSnackbar)

   return(
      <div className={showWrkSnackbar ? "custom_working_snackbar" : "hide_custom_working_snackbar custom_working_snackbar"}>
         <p role="alert">Working...</p>
      </div>
   )
}