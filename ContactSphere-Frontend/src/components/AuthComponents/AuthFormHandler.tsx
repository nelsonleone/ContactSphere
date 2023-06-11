import { IFormData } from '../../vite-env';
import { AlertSeverity, AuthFormLocation } from '../../enums';
import { useAppDispatch } from '../../customHooks/reduxCustomHooks';
import { setShowAlert } from '../../RTK/features/alertSlice'
import { setUserDetails } from '../../RTK/features/authUserSlice';
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthorizeUserMutation } from '../../RTK/features/injectedAuthApiQueries';
import emailSignInHandler from '../../firebaseClient/signInWithEmailAndPassword';
import emailSignupHandler from '../../firebaseClient/createUserWithEmailAndPassword';
import { useState, useEffect } from 'react'
import updateUserProfile from '../../firebaseClient/updateUserProfile';
import Cookies from 'js-cookie';
import { auth } from '../../firebaseClient/firebaseInit';
import AltAuthMethods from './AltAuthMethods'
import AuthForm from './AuthForm';
import cleanDisplayName from '../../utils/helperFns/cleanDisplayName';
 

interface IProps{
   location: string
}


export default function AuthFormHandler(props:IProps){

   const dispatch = useAppDispatch()
   const { location } = props;
   const [ authorizeUser, { isLoading } ] = useAuthorizeUserMutation()
   const [requestLoading,setRequestLoading] = useState(isLoading)

   // Form Handler
   const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<IFormData>({
      defaultValues: {
         displayName: "#"
      }
   })

   useEffect(() => {
      setRequestLoading(isLoading)
   },[isLoading])


   const handleAuthRequest :SubmitHandler<IFormData> = async(formData)  =>  {

      

      const { email, password, displayName } = formData;
      //   USER SIGNIN HANDLER

      try{
         setRequestLoading(true)
         const userCredentials= location === AuthFormLocation.SIGN_IN ?
          await emailSignInHandler(email,password)  :
          await emailSignupHandler(email,password)

         if(!userCredentials) {
            // precaution
            throw new Error("Incorrect Credentials")
         }

         if(location === AuthFormLocation.SIGN_UP){
            // update user displayName manually
            await updateUserProfile(cleanDisplayName(displayName))
         }

         // send IdToken To Server For Further Authentication
         const idToken = await userCredentials.user.getIdToken()
         const csrfToken = Cookies.get('csrfToken') || '';
         await authorizeUser({idToken,csrfToken})
         dispatch(
            setShowAlert(
               {
                  alertMessage: "Signed In Successfully",
                  severity: AlertSeverity.SUCCESS
               }
            )
         )

         // set User Details
         dispatch(
            setUserDetails({
               email: userCredentials.user.email,
               displayName: userCredentials.user.displayName,
               photoURL: userCredentials.user.photoURL,
               uid: userCredentials.user.uid
            })
         )
      }

      catch(err:any){
         dispatch(setShowAlert({alertMessage:err?.data?.message || err.message, severity: AlertSeverity.ERROR}))
      }

      finally{
         setRequestLoading(false)
         
         // remove Browser Persisted Auth User (precaution)
         auth.signOut()
      }
   }



   return(
      <div className="auth-contents">
         <AuthForm 
           handleSubmit={handleSubmit}
           handleAuthRequest={handleAuthRequest}
           register={register}
           location={location}
           setValue={setValue}
           requestLoading={requestLoading}
           errors={errors}
           getValues={getValues}
         />
         <AltAuthMethods />
      </div>
   )
}