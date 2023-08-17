import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthMethod } from "../../enums";


interface ISliceState {
   beenAuthenticated: boolean | null,
   userDetails: {
      displayName: string | null,
      email: string | null,
      photoURL?: string | null,
      uid: string | null
   },
   authMethod: AuthMethod | null
}

interface ISetUserDetailsPayload  {
   displayName: string | null,
   email: string | null,
   photoURL?: string | null,
   uid: string | null,
   authMethod: AuthMethod | null
}

const initialState: ISliceState = {
   beenAuthenticated: null,
   userDetails: {
      displayName: null,
      email: null,
      photoURL: null,
      uid: null
   },
   authMethod: null
}


const authUserSlice = createSlice({
   name: "AuthUserSlice",
   initialState,
   reducers: {
      setUserDetails: (state, action: PayloadAction<ISetUserDetailsPayload>) => {
         const { displayName, email, photoURL, uid, authMethod } = action.payload;

         state.userDetails = {
            displayName ,
            email,
            photoURL,
            uid
         }
         state.beenAuthenticated = true;
         state.authMethod = authMethod;
     },

     setLocalLogout: state => {
         state.beenAuthenticated = false;
         state.userDetails = { uid: null , displayName: null, email: null,  photoURL: null }
         state.authMethod = null;
      }
   }
})
 
export const { setLocalLogout, setUserDetails } = authUserSlice.actions;
export default authUserSlice.reducer;