import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Breakpoints } from '../../enums'

const openNavMenuSlice = createSlice({
   name: 'openNavMenu',
   initialState: {
      openNav: window.innerWidth >= Breakpoints.Large
   },
   reducers: {
      setOpenNav: (state, { payload }:PayloadAction<boolean>) => {
         state.openNav = payload
      }
   }
})

export const { setOpenNav } = openNavMenuSlice.actions;
export default openNavMenuSlice.reducer; 