import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux/es/exports"
import { getGoogleUser, getUserBrowserAuthSession } from "../redux/features/userAuthSlice"
import { browserSessionPersistence, onAuthStateChanged, setPersistence, signInWithPopup } from "firebase/auth"
import authCurrentUserObj from "./Helper/authCurrentUserObj"
import { auth, authProvider } from "../firebase/firebase-features"
import { Alert , AlertTitle} from "@mui/material"
import { useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { setLoading } from '../redux/features/loadingSlice'
import Loading from './Loading'
import ContactsHandler from './ContactsHandler'


export default function AuthManager(){


   // AUTH MANAGEMNET
   const { beenAuthenticated }  = useSelector(store => store.userAuth)
   const dispatch = useDispatch()
   const [authError,setAuthError] = useState({show:false,message:null})
   const [authSuccess,setAuthSuccess] = useState({show:false,message:null})
   const { proceededWithGoogle } = useSelector(store =>  store.userAuth)
   const { isLoading } = useSelector(store => store.loading)
   const navigate = useNavigate()
   const location = useLocation()
   const [signInSuccess,setSignInSuccess] = useState({show:false,message:"Signed In Successfully"})

   async function handleGoogleSignIn(){   
      try{
         await signInWithPopup(auth,authProvider)
         setAuthSuccess({show:true,message:`Signed In Successfully as ${auth.currentUser?.displayName}`})
         dispatch(getGoogleUser(authCurrentUserObj(auth.currentUser)))
      }
      catch(err){
         setAuthError({show:true,message:err.code})
      }
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth,user => {
         setPersistence(auth,browserSessionPersistence)
         if(user){
            dispatch(getUserBrowserAuthSession(authCurrentUserObj(auth.currentUser)))
            setSignInSuccess(prevState => {
               return {...prevState,show:true}
            })
         }
      })

      return () => {
         unsubscribe()
      }
   },[auth.currentUser])


   useEffect(() => {
      let stopLoading;
      if(!auth.currentUser){
         stopLoading = setTimeout(() => {
            dispatch(setLoading(false))
         }, 4000)
      }
      else if(auth.currentUser){
         dispatch(setLoading(false))
      }
      return () =>  clearTimeout(stopLoading)
   },[auth.currentUser])


   useEffect(() =>  {
      let alertTimer;
      if(authSuccess.show){
         alertTimer = setTimeout(() => {
            setAuthSuccess(prevState => {
               return {...prevState,show:false}
            })
         }, 2000);
      }

      else if(authError.show){
         alertTimer = setTimeout(() => {
            setAuthError(prevState => {
               return {...prevState,show:false}
            })
         }, 2000);
      }

      else if(signInSuccess.show){
         alertTimer = setTimeout(() => {
            setSignInSuccess(prevState => {
               return {...prevState,show:false}
            })
         }, 2000);
      }

      return ()  => clearTimeout(alertTimer)
   },[authError,authSuccess,signInSuccess])

   useEffect(() => {
      if(proceededWithGoogle){
         handleGoogleSignIn()
      }
   },[proceededWithGoogle])

   return(
      <div className="auth-section">
       <Loading set={isLoading}/>
       <ContactsHandler />
       {
         authError.show &&
         <Alert severity="error" className="alert-box">
            <AlertTitle>Error</AlertTitle>
            <span>
               {authError.message} — <strong>Try Again!</strong>
            </span>
         </Alert>
       }

         {
            signInSuccess.show &&
            <Alert severity="success" className="alert-box">{signInSuccess.message}</Alert>
         }
      </div>
   )
   
}