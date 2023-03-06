import { createSlice } from "@reduxjs/toolkit";
import { getSearchQuery } from "./asyncThunks";

const initialState = {
   foundContacts:[],
   isFetching:false,
   error:null
}

const searchSlice = createSlice({
   name:"contactSearch",
   initialState,
   reducers:{},

   extraReducers:builder => {
      builder
         .addCase(getSearchQuery.pending,state => {
            state.isFetching = true;
         })
         .addCase(getSearchQuery.fulfilled,(state,{payload}) => {
            state.isFetching = false;
            state.foundContacts = payload;
         })
         .addCase(getSearchQuery.rejected,(state,{payload}) => {
            state.isFetching = false;
            state.error = payload;
        })
   }
})

export default searchSlice.reducer;