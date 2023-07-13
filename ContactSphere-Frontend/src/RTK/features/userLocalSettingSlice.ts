import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortBy } from "../../enums";

const initialState: { sortBy:SortBy } = {
   sortBy: localStorage.getItem('sortBy') as SortBy || SortBy.FirstName
}

const userLocalSettingSlice = createSlice({
   name: 'userLocalSettings',
   initialState,
   reducers: {
      setSortBy: (state,{ payload }:PayloadAction<SortBy>) => {
         state.sortBy = payload;
         localStorage.setItem('sortBy',state.sortBy)
      }
   }
})

export const { setSortBy } = userLocalSettingSlice.actions;
export default userLocalSettingSlice.reducer;