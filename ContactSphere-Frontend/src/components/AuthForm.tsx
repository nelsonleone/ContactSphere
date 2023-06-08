import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import  { FloatingLabelInput } from '../../lib/customInputs/FloatingLabelInput'
import  { AutocompleteInput } from '../../lib/customInputs/AutoCompleteInput'
import  AuthFormPasswordInput from '../../lib/customInputs/PasswordInput'
import  LoadingButton from '../../lib/buttons/LoadingButton'
import { IFormData } from '../vite-env';
import { AlertSeverity, AuthFormLocation } from '../enums';
import { useAppDispatch } from '../customHooks/reduxCustomHooks';
import { setShowAlert } from '../RTK/features/alertSlice'
import { setUserDetails } from '../RTK/features/authUserSlice';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import Button from '@mui/material/Button';
import { useAuthorizeUserMutation } from '../RTK/features/injectedApiQueries';
import emailSignInHandler from '../firebaseClient/signInWithEmailAndPassword';
import emailSignupHandler from '../firebaseClient/createUserWithEmailAndPassword';
import { useState, useEffect } from 'react'
import updateUserProfile from '../firebaseClient/updateUserProfile';
import Cookies from 'js-cookie';
 

interface IProps{
   location: string
}


export default function AuthForm(props:IProps){

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
      if (location === AuthFormLocation.SIGN_IN){

         try{
            setRequestLoading(true)
            const userCredentials= await emailSignInHandler(email,password)

            // send IdToken To Server For Further Authentication
            const idToken = await userCredentials.user.getIdToken()
            const csrfToken = Cookies.get('csrfToken')
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
            console.log(err.message,err.code)
            dispatch(setShowAlert({alertMessage:err?.data?.message || err.message, severity: AlertSeverity.ERROR}))
         }

         finally{
            setRequestLoading(false)
         }
      }


      // USER SIGNUP HANDLER
      else if (location === AuthFormLocation.SIGN_UP){
         try{
            setRequestLoading(true)
            const userCredentials = await emailSignupHandler(email,password)
            const { 
               getIdToken, 
               email:UserEmail, 
               displayName:UserDisplayName, 
               photoURL:UserPhotoURL, 
               uid:UserUid
            } = userCredentials.user;

            // send IdToken To Server For Further Authentication
            const idToken = await getIdToken()
            const csrfToken = Cookies.get('csrfToken')
            await authorizeUser({idToken,csrfToken})

            // update User DisplayName
            await updateUserProfile(displayName)

            dispatch(setUserDetails({
               email: UserEmail,
               displayName: UserDisplayName,
               uid: UserUid,
               photoURL: UserPhotoURL
            }))
            dispatch(setShowAlert(
               {
                  alertMessage:"Signed In Successfully",
                  severity: AlertSeverity.SUCCESS
               }
            ))
         }
         catch(err:any){
            console.log(err.message,err.code)
            dispatch(setShowAlert({alertMessage:err?.data?.message|| err.message, severity: AlertSeverity.ERROR}))
         }

         
         finally{
            setRequestLoading(false)
         }
      }
   }



   return(
      <div className="auth-contents">
         <form onSubmit={handleSubmit(handleAuthRequest)}>
            <AutocompleteInput 
               registerField={register} 
               error={errors.email?.message} 
               setValue={setValue}
            />
            <AuthFormPasswordInput
               registerField={register} 
               error={errors.password?.message} 
            />
            {
               props.location === AuthFormLocation.SIGN_UP ?
               <FloatingLabelInput
                  registerField={register} 
                  error={errors.displayName?.message}
                  getValues={getValues}
               />
               :
               ""
            }

            <div className="flex-row">
               <LoadingButton location={location} buttonType="submit" loading={requestLoading} />
               <Link to={props.location === AuthFormLocation.SIGN_UP ? "/auth/signin" : "/auth/create_account"}>
               {location === AuthFormLocation.SIGN_IN ? "Create Account" : "Sign In"}
               </Link>
            </div>
         </form>

         <div className='alt_auth_methods'>
            <h3>Continue With..</h3>
            <Button startIcon={<FcGoogle />}>
               Google
            </Button>

            <Button startIcon={ <FaPhoneAlt />}>
               Phone Number
            </Button>
         </div>
      </div>
   )
}