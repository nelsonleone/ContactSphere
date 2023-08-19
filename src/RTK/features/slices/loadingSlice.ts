import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
   name: 'loadingSlice',
   initialState:  {
      load: false
   },
   reducers: {
      setLoad: (state,{ payload }:PayloadAction<boolean>) => {
         state.load = payload
      }
   }
})

export const { setLoad } = loadingSlice.actions;
export default loadingSlice.reducer;