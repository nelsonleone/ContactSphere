import { createSlice } from '@reduxjs/toolkit'
import { auth } from '../../firebase/firebase-features';


const initialState = {
   beenAuthenticated:auth.currentUser ? true : false,
   proceededWithGoogle:null,
   authUserDetails:{
      email:null,
      displayName:null,
      photoURL:null,
      userID: null
   }
}

const userAuthSlice = createSlice({
   name:"userAuth",
   initialState,
   reducers:{
      renderGooglePopup: state => {
         state.proceededWithGoogle = true; 
      },
      getGoogleUser: (state, {payload}) => {
         state.authUserDetails = payload;
         state.beenAuthenticated = true;
      },
      getEmailAndPasswordUser: (state, {payload}) => {
         state.authUserDetails = payload
         state.beenAuthenticated = true;
      },
      getUserBrowserAuthSession:  (state, {payload}) => {
         state.authUserDetails = payload;
         state.beenAuthenticated = true;
      },
      signOutUser: state => {
         state.beenAuthenticated =  false;
         auth.signOut()
      }
   }
})

export const {
   getGoogleUser,
   renderGooglePopup,
   getEmailAndPasswordUser ,
   getUserBrowserAuthSession,
   signOutUser
} = userAuthSlice.actions;
export default userAuthSlice.reducer;


