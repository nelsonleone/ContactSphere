import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserData, UserLabels } from '../../vite-env'

const initialState:UserData = {
   labels: [],
   contacts: []
}

const userDataSlice = createSlice({
   name: "userDataSlice",
   initialState,
   reducers: {
      setUserData: (state,{ payload }:PayloadAction<UserData>) => {
         state.contacts = payload.contacts;
         state.labels = payload.labels;
      },

      updateLabels: (state, { payload }:PayloadAction<UserLabels|[]>) => {
         state.labels = payload;
      } 
   }
})

export const { setUserData, updateLabels } = userDataSlice.actions;
export default userDataSlice.reducer;