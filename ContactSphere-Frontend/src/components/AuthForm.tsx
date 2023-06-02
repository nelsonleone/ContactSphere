import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import { FormEvent, useState } from 'react';
import  { FloatingLabelInput } from '../../lib/customInputs/FloatingLabelInput'
import  { AutocompleteInput } from '../../lib/customInputs/AutoCompleteInput'
import  AuthFormPasswordInput from '../../lib/customInputs/PasswordInput'
import  LoadingButton from '../../lib/buttons/LoadingButton'
import { IFormData } from '../vite-env';
import { signinState, signupState } from './FormStateObj';
import setInputErrors from '../utils/helperFns/setInputError';
import { AuthFormLocation } from '../enums';
import useAuthentication from '../customHooks/useAuthentication';
import { useAppDispatch } from '../customHooks/reduxCustomHooks';
import { hideAlert } from '../RTK/features/alertSlice'

interface IProps{
   location: string
}


export default function AuthForm(props:IProps){

   const [formData, setFormData] = useState<IFormData>(
      props.location === AuthFormLocation.SIGN_IN ?
      signinState :
      signupState
   )
   const dispatch = useAppDispatch()

   const { authRequest, isLoading, isError } = useAuthentication(props.location)


   // signin handler
   const handleSignin = async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // handle check for invalid inputs
      setInputErrors(props.location,formData,setFormData)

      const hasError = Object.values(formData).some(field =>  field.error !== null)
      if(hasError){
         return;
      }

      try{
         await authRequest(
            {
               email:formData.email.value,
               password:formData.password.value,
               displayName:formData.displayName.value
            }
         )
      }
      catch(err:unknown){
         dispatch(showAlert())
      }
   }


   // signup handler
   const handleCreateNewAccount = async(e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // handle check for Invalid Inputs
      setInputErrors(props.location,formData,setFormData)

      const hasError = Object.values(formData).some(field =>  field.error !== null)
      if(hasError){
         return;
      }

      try{
         await authRequest(
            {
               email:formData.email.value,
               password:formData.password.value
            }
         )
      }
      catch(err:any){console.log(err.message)}
   }



   return(
      <div className="auth-contents">
         <form onSubmit={props.location === AuthFormLocation.SIGN_IN ? handleSignin : handleCreateNewAccount}>
            <AutocompleteInput 
               fieldValue={formData.email.value} 
               error={formData.email.error} 
               setFormData={setFormData}
            />
            <AuthFormPasswordInput
               fieldValue={formData.password.value} 
               error={formData.password.error} 
               setFormData={setFormData}
            />
            {
               props.location === AuthFormLocation.SIGN_UP ?
               <FloatingLabelInput
                  fieldValue={formData.displayName?.value!} 
                  error={formData.displayName?.error!} 
                  setFormData={setFormData}
               />
               :
               ""
            }
            <LoadingButton location={props.location} buttonType="submit" loading={isLoading} />
         </form>

         <div className='alt_auth_methods'>
            <h3>Continue With..</h3>
            <button>
               <FcGoogle />
               <span>Google</span>
            </button>

            <button>
               <FaPhoneAlt />
               <span>Phone Number</span>
            </button>
         </div>
      </div>
   )
}