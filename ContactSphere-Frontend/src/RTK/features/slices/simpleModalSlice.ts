import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IinitialState {
   showSimpleModal: boolean,
   text1: string,
   text2: string,
}

type SimpleModalPayload = Pick<IinitialState, 'text1' | 'text2' >

const initialState: IinitialState = {
   showSimpleModal: false,
   text1: "",
   text2: ""
}

const simpleModalSlice = createSlice({
   name: "simpleModal",
   initialState,
   reducers: {
      setShowSimpleModal: (state, { payload }:PayloadAction<SimpleModalPayload>) => {
         state.showSimpleModal = true;
         state.text1 = payload.text1;
         state.text2 = payload.text2;
      },

      setHideSimpleModal: state => {
         state.showSimpleModal = false;
         state.text1 = "";
         state.text2 = "";
      }
   }
})

export const { setHideSimpleModal, setShowSimpleModal} = simpleModalSlice.actions;
export default simpleModalSlice.reducer;