import { createSlice } from "@reduxjs/toolkit";

const wrkSnackbarSlice = createSlice({
   name: 'wrkSnackbar',
   initialState: {
      showWrkSnackbar: false
   },
   reducers: {
      setShowWrkSnackbar: state => {
         state.showWrkSnackbar = true
      },
      setHideWrkSnackbar: state => {
         state.showWrkSnackbar = false;
      }
   }
})

export const { setShowWrkSnackbar, setHideWrkSnackbar } = wrkSnackbarSlice.actions;
export default wrkSnackbarSlice.reducer;