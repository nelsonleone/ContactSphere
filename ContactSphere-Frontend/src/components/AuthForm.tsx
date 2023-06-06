import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import { FormEvent } from 'react';
import  { FloatingLabelInput } from '../../lib/customInputs/FloatingLabelInput'
import  { AutocompleteInput } from '../../lib/customInputs/AutoCompleteInput'
import  AuthFormPasswordInput from '../../lib/customInputs/PasswordInput'
import  LoadingButton from '../../lib/buttons/LoadingButton'
import { IFormData } from '../vite-env';
import { AlertSeverity, AuthFormLocation } from '../enums';
import useAuthentication from '../customHooks/useAuthentication';
import { useAppDispatch } from '../customHooks/reduxCustomHooks';
import { setShowAlert } from '../RTK/features/alertSlice'
import { setUserDetails } from '../RTK/features/authUserSlice';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import Button from '@mui/material/Button';

interface IProps{
   location: string
}


export default function AuthForm(props:IProps){

   const dispatch = useAppDispatch()
   const { location } = props;
   const { authRequest, isLoading } = useAuthentication(props.location)

   // Form Handler
   const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<IFormData>({
      defaultValues: {
         displayName: "#"
      }
   })


   const handleAuthRequest :SubmitHandler<IFormData> = async(formData)  =>  {
      const { email, password, displayName } = formData;
      //   USER SIGNIN HANDLER
      if (location === AuthFormLocation.SIGN_IN){

         try{
            const res = await authRequest({email,password}).unwrap()
            dispatch(setUserDetails(res))
            dispatch(setShowAlert(
               {
                  alertMessage:"Signed In Successfully",
                  severity: AlertSeverity.SUCCESS
               }
            ))
         }
   
         catch(err:any){
            dispatch(setShowAlert({alertMessage:err?.data?.message || err.error, severity: AlertSeverity.ERROR}))
         }
      }


      // USER SIGNUP HANDLER
      else if (location === AuthFormLocation.SIGN_UP){
         try{
            const res = await authRequest({email,password,displayName}).unwrap()
            dispatch(setUserDetails(res))
            dispatch(setShowAlert(
               {
                  alertMessage:"Signed In Successfully",
                  severity: AlertSeverity.SUCCESS
               }
            ))
         }
         catch(err:any){
            dispatch(setShowAlert({alertMessage:err?.data?.message|| err.error, severity: AlertSeverity.ERROR}))
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
               <LoadingButton location={location} buttonType="submit" loading={isLoading} />
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