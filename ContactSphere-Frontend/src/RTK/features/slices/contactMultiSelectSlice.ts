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
         const selected = state.selectedContacts.some(contactId => contactId === payload)

         if(selected){
            state.selectedContacts = state.selectedContacts.filter(contactId => contactId !== payload)
         }
         else{
            state.selectedContacts = [...state.selectedContacts,payload]
         }
      },
      setSelectAll: (state,{ payload }:PayloadAction<string[]>) => {
         state.selectedContacts = payload;
      },
      setSelectNone: state => {
         state.selectedContacts = []
      }
   }
})

export const { setSelected, setSelectAll, setSelectNone } = contactsMultiSelectSlice.actions;
export default contactsMultiSelectSlice.reducer;