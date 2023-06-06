import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISliceState {
   beenAuthenticated: boolean | null,
   userDetails: {
      displayName: string | null,
      email: string | null,
      photoURL?: string | null,
      uid: string | null
   }
}

const initialState: ISliceState = {
   beenAuthenticated: null,
   userDetails: {
      displayName: null,
      email: null,
      photoURL: null,
      uid: null
   }
}

const authUserSlice = createSlice({
   name: "AuthUserSlice",
   initialState,
   reducers: {
      setUserDetails: (state, action: PayloadAction<ISliceState['userDetails']>) => {
         const { displayName, email, photoURL, uid } = action.payload;

         state.userDetails = {
            displayName ,
            email,
            photoURL,
            uid
         }
         state.beenAuthenticated = true;
     },

     setLocalLogout: state => {
         state.beenAuthenticated = false;
         state.userDetails = { uid: null , displayName: null, email: null,  photoURL: null }
      }
   }
})
 
export const { setLocalLogout, setUserDetails } = authUserSlice.actions;
export default authUserSlice.reducer;