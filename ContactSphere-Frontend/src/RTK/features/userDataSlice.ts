import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserData } from '../../vite-env'


type ILabelsPayload = {
   _id: string,
   label: string
}[]

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

      updateLabels: (state, { payload }:PayloadAction<ILabelsPayload|[]>) => {
         state.labels = payload;
      } 
   }
})

export const { setUserData, updateLabels } = userDataSlice.actions;
export default userDataSlice.reducer;