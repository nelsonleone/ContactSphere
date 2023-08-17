import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const shouldDiscardChangesSlice = createSlice({
   name: 'shouldDiscardChanges',
   initialState: {
      thereAreChanges: false
   },
   reducers:{
      setThereAreChanges: (state,{ payload }:PayloadAction<boolean>) => {
         state.thereAreChanges = payload
      }
   }
})

export const { setThereAreChanges } = shouldDiscardChangesSlice.actions;
export default shouldDiscardChangesSlice.reducer