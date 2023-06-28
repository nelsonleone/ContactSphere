import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IContactsFromDB, UserData, UserLabels } from '../../vite-env'

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
      },
      
      setEdittedContact: (state, { payload }:PayloadAction<IContactsFromDB>) => {
         state.contacts = state.contacts.filter(contact => (
            contact._id !== payload._id 
         ))

         state.contacts = [...state.contacts,payload]
      }
   }
})

export const { setUserData, updateLabels, setEdittedContact } = userDataSlice.actions;
export default userDataSlice.reducer;