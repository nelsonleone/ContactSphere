import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IInitState {
   selectedContacts: string[]
}

const initialState:IInitState = {
   selectedContacts: []
}

const contactsMultiSelectSlice = createSlice({
   name: "contactMultiSelect",
   initialState,
   reducers: {
      setSelected: (state,{ payload }:PayloadAction<string>) => {
         state.selectedContacts = [...state.selectedContacts,payload]
      }
   }
})

export const { setSelected } = contactsMultiSelectSlice.actions;
export default contactsMultiSelectSlice.reducer;