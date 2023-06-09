import AuthFormHandler from "../components/AuthComponents/AuthFormHandler";
import { AuthFormLocation } from "../enums";

export default function SignInPage(){

   return(
      <main className="page auth-page signin">
         <h2>Welcome Back</h2>
         <AuthFormHandler location={AuthFormLocation.SIGN_IN} />
      </main>
   )
}