import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import { FormEvent, useEffect, useState } from 'react';
import  { FloatingLabelInput } from '../../lib/customInputs/FloatingLabelInput'
import  { AutocompleteInput } from '../../lib/customInputs/AutoCompleteInput'
import  AuthFormPasswordInput from '../../lib/customInputs/PasswordInput'
import { useSetNewUserMutation } from '../RTK/features/injectedApiQueries';
import { IFormData } from '../vite-env';
import { signinState, signupState } from './FormStateObj';
import setInputErrors from '../utils/helperFns/setInputError';

interface IProps{
   location: string
}


export default function AuthForm(props:IProps){

   const [formData, setFormData] = useState<IFormData>(
      props.location === "signin" ?
      signinState :
      signupState
   )

   const [ setNewUser,{}] = useSetNewUserMutation()


   const handleSignin = async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setInputErrors(props.location,formData,setFormData)

      const hasError = Object.values(formData).some(field =>  field.error !== null)
      if(hasError){
         return;
      }

      try{
         await setNewUser(
            {
               email:formData.email.value,
               password:formData.password.value
            }
         )
      }
      catch(err:any){console.log(err.message)}
   }


   const handleCreateNewAccount = async() => {}

   return(
      <div className="auth-contents">
         <form onSubmit={props.location === "signin" ? handleSignin : handleCreateNewAccount}>
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
               props.location === "signup" ?
               <FloatingLabelInput
                  fieldValue={formData.displayName?.value!} 
                  error={formData.displayName?.error!} 
                  setFormData={setFormData}
               />
               :
               ""
            }
            <button type="submit">{props.location === "signin" ? "Sign In" : "Create Account"}</button>
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