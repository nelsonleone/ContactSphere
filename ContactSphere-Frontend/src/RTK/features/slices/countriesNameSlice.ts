import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { countryDataObj } from "../../vite-env";

const initialState:countryDataObj[] = []

const countriesNameSlice = createSlice({
  name: 'countriesName',
  initialState,
  reducers: {
      setCountriesNames: (state, { payload }:PayloadAction<countryDataObj[]>) => {
        state = payload
      }
   }
})

export const { setCountriesNames } = countriesNameSlice.actions;
export default countriesNameSlice.reducer;