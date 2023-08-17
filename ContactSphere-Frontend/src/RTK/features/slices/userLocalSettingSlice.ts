import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortBy } from "../../../enums";
import { ColumnOrderData } from "../../../vite-env";


const columnOrderData = [
   {
      colName: "name",
      order: 1,
   },
   {
      colName: "email",
      order: 2,
   },
   {
      colName: "phone-number",
      order: 3,
   },
   {
      colName: "job-title",
      order: 4,
   }
]

const initialState: { sortBy:SortBy, columnOrder: ColumnOrderData } = {
   sortBy: localStorage.getItem('sortBy') as SortBy || SortBy.FirstName,
   columnOrder: localStorage.getItem('columnOrder') ? JSON.parse(localStorage.getItem('columnOrder')!) as ColumnOrderData : columnOrderData
}

const userLocalSettingSlice = createSlice({
   name: 'userLocalSettings',
   initialState,
   reducers: {
      setSortBy: (state,{ payload }:PayloadAction<SortBy>) => {
         state.sortBy = payload;
         localStorage.setItem('sortBy',state.sortBy)
      },
      setColumnOrder: (state,{ payload }:PayloadAction<ColumnOrderData>)=> {
         state.columnOrder = payload;
         localStorage.setItem('columnOrder',JSON.stringify(state.columnOrder))
      }
   }
})

export const { setSortBy, setColumnOrder } = userLocalSettingSlice.actions;
export default userLocalSettingSlice.reducer;