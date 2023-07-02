import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortBy } from "../../enums";

const userLocalSettingSlice = createSlice({
   name: 'userLocalSettings',
   initialState: {
      sortBy: SortBy.FirstName
   },
   reducers: {
      setSortBy: (state,{ payload }:PayloadAction<SortBy>) => {
         state.sortBy = payload;
         localStorage.setItem('sortBy',state.sortBy)
      }
   }
})

export const { setSortBy } = userLocalSettingSlice.actions;
export default userLocalSettingSlice.reducer;