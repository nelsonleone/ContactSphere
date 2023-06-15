import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Contact, UserData } from '../../vite-env'

interface IInitState {
   labels: string[] | null,
   contacts: Contact[] |[]
}

const initialState:IInitState = {
   labels: null,
   contacts: []
}

const userDataSlice = createSlice({
   name: "userDataSlice",
   initialState,
   reducers: {
      setUserData: (state,{ payload }:PayloadAction<UserData>) => {
         state.contacts = payload.contacts;
         state.labels = payload.labels;
      }
   }
})

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;