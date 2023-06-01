import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import { useState } from 'react';
import  { FloatingLabelInput } from '../../lib/customInputs/FloatingLabelInput'
import  { AutocompleteInput } from '../../lib/customInputs/AutoCompleteInput'
import  AuthFormPasswordInput from '../../lib/customInputs/PasswordInput'
import { IFormData } from '../vite-env';

interface IProps{
   location: string
}


export default function AuthForm(props:IProps){

   const [formData, setFormData] = useState<IFormData>({
     email: {
       value: "",
       error: null,
     },
     password: {
       value: "",
       error: null,
     },
      displayName: {
       value: "",
       error: null,
     },
   })

   return(
      <div className="auth-contents">
         <form>
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