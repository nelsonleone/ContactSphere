import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Duplicate } from "../../../vite-env";
import { groupBy } from 'lodash'

interface IinitialState {
   duplicates: {
      [key:string]: Duplicate[]
   }
}

const initialState: IinitialState = {
   duplicates: {}
}

const resolveDuplicatesSlice = createSlice({
   name: 'resolveDuplicates',
   initialState,
   reducers: {
      setDuplicates: (state, { payload }:PayloadAction<Duplicate[]>) => {
         state.duplicates = groupBy(payload,'mergeRef')
      }
   }
})

export const { setDuplicates } = resolveDuplicatesSlice.actions;
export default resolveDuplicatesSlice.reducer;