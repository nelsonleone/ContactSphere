import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISliceState {
   beenAuthenticated: boolean | null,
   userDetails: {
      displayName: string | null,
      email: string | null,
      photoURL?: string | null,
      _id: string | null
   }
}

const initialState: ISliceState = {
   beenAuthenticated: null,
   userDetails: {
      displayName: null,
      email: null,
      photoURL: null,
      _id: null
   }
}

const authUserSlice = createSlice({
   name: "AuthUserSlice",
   initialState,
   reducers: {
      setUserDetails: (state, action: PayloadAction<ISliceState['userDetails']>) => {
         const { displayName, email, photoURL, _id } = action.payload;

         state.userDetails = {
            displayName ,
            email,
            photoURL,
            _id
         }
         state.beenAuthenticated = true;
     },

     setLocalLogout: state => {
         state.beenAuthenticated = false;
         state.userDetails = { _id: null , displayName: null, email: null,  photoURL: null }
      }
   }
})
 
export const { setLocalLogout, setUserDetails } = authUserSlice.actions;
export default authUserSlice.reducer;