import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertSeverity } from "../../enums";

interface IinitialState {
   showAlert: boolean,
   severity: AlertSeverity | undefined,
   alertMessage: string
}

type AlertPayload = Pick<IinitialState, 'alertMessage' | 'severity' >

const initialState: IinitialState = {
   showAlert: false,
   severity: undefined,
   alertMessage: ""
}

const alertSlice = createSlice({
   name: "alertSlice",
   initialState,
   reducers: {
      setShowAlert: (state, { payload }:PayloadAction<AlertPayload>) => {
         state.showAlert = true;
         state.severity = payload.severity;
         state.alertMessage = payload.alertMessage;
      },

      setHideAlert: state => {
         state.showAlert = false;
         state.severity = undefined;
         state.alertMessage = "";
      }
   }
})

export const { setShowAlert, setHideAlert} = alertSlice.actions;
export default alertSlice.reducer;