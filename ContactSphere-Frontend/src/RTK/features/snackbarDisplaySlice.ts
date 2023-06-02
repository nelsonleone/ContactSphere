import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IinitialState {
   showSnackbar: boolean,
   snackbarMessage: string
}

type SnackbarPayload = Pick<IinitialState, 'snackbarMessage'>

const initialState: IinitialState = {
   showSnackbar: false,
   snackbarMessage: ""
}

const snackbarDisplaySlice = createSlice({
   name: "snackbarDisplaySlice",
   initialState,
   reducers: {
      setShowSnackbar: (state,{ payload }:PayloadAction<SnackbarPayload>) => {
         state.showSnackbar = true;
         state.snackbarMessage = payload.snackbarMessage


         setTimeout(() => {
            state.showSnackbar = false
            state.snackbarMessage =  ""
         },4000)
      },

      hideSnackbar: state => {
         state.showSnackbar = false
         state.snackbarMessage = ""
      }
   }
})

export const { setShowSnackbar, hideSnackbar} = snackbarDisplaySlice.actions;
export default snackbarDisplaySlice.reducer;