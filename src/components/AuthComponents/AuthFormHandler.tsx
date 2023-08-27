import { IFormData } from '../../vite-env';
import { AlertSeverity, AuthFormLocation, AuthMethod } from '../../enums';
import { useAppDispatch } from '../../customHooks/reduxCustomHooks';
import { setShowAlert } from '../../RTK/features/slices/alertSlice'
import { setUserDetails } from '../../RTK/features/slices/authUserSlice';
import { useForm, SubmitHandler } from "react-hook-form";
import emailSignInHandler from '../../firebaseClient/signInWithEmailAndPassword';
import emailSignupHandler from '../../firebaseClient/createUserWithEmailAndPassword';
import { useState } from 'react'
import updateUserProfile from '../../firebaseClient/updateUserProfile';
import { auth } from '../../firebaseClient/firebaseInit';
import AltAuthMethods from './AltAuthMethods'
import AuthForm from './AuthForm';
import cleanDisplayName from '../../utils/helperFns/cleanDisplayName';
import { browserSessionPersistence, setPersistence } from 'firebase/auth';
 

interface IProps{
   location: string
}


export default function AuthFormHandler(props:IProps){

   const dispatch = useAppDispatch()
   const { location } = props;
   const [requestLoading,setRequestLoading] = useState(false)

   // Form Handler
   const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<IFormData>({
      defaultValues: {
         displayName: "#"
      }
   })


   const handleAuthRequest :SubmitHandler<IFormData> = async(formData)  =>  {

      

      const { email, password, displayName } = formData;
      //   USER SIGNIN HANDLER

      try{
         setRequestLoading(true)
         setPersistence(auth, browserSessionPersistence)
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
               uid: userCredentials.user.uid,
               authMethod: AuthMethod.Email
            })
         )
      }

      catch(err:any){
         dispatch(setShowAlert({alertMessage:err?.data?.message || err.message, severity: AlertSeverity.ERROR}))
      }

      finally{
         setRequestLoading(false)
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