import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IContactsFromDB } from '../../../vite-env';

interface IinitialState {
   searchedContacts: IContactsFromDB[]
}

const initialState: IinitialState = {
   searchedContacts: []
}



const searchContactsSlice = createSlice({
   name: 'searchContacts',
   initialState,
   reducers: {
      setSearchResult: (state,{ payload }:PayloadAction<IContactsFromDB[]>) => {
         state.searchedContacts = payload;
      },
      removeSearchResult: state => {
         state.searchedContacts = []
      }
   }
})

export const { setSearchResult, removeSearchResult } = searchContactsSlice.actions;
export default searchContactsSlice.reducer;