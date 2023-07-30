import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Duplicates, IContactsFromDB } from "../../vite-env";

const initialState: Duplicates = []

const resolveDuplicatesSlice = createSlice({
   name: 'resolveDuplicates',
   initialState,
   reducers: {
      setDuplicates: (state, { payload }:PayloadAction<IContactsFromDB[]>) => {
         state = payload.map(c => {
            const lastIndex = c._id.length - 1;
            return {
               ...c,
               refId: `refId-${c._id.slice(0,5)}${c._id.slice(lastIndex - 5,lastIndex)}`
            }
         })
      }
   }
})

export const { setDuplicates } = resolveDuplicatesSlice.actions;
export default resolveDuplicatesSlice.reducer;