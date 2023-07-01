import * as React from 'react'
import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'


export default function CustomWrkSnackbar(){

   const { showWrkSnackbar } = useAppSelector(store => store.wrkSnackbar)

   return(
      showWrkSnackbar ?
      <div className="custom_working_snackbar">
         <p role="alert">Working...</p>
      </div>
      :
      null
   )
}