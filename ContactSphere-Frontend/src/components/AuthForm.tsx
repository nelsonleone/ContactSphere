import { AutocompleteForm, FloatingLabelInput } from '../../lib/CustomInputs';
import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import { useState } from 'react';

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
            <AutocompleteForm 
               fieldValue={formData.email.value} 
               error={formData.email.error} 
               setFormData={setFormData}
               />
            <FloatingLabelInput 
               fieldValue={formData.password.value} 
               error={formData.password.error} 
               setFormData={setFormData}
            />
            <button type="submit">{props.location === "signin" ? "Sign In" : "Create Account"}</button>
         </form>

         <h2>Continue With..</h2>
         <div className='alt_auth_methods'>
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