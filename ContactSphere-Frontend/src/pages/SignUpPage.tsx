import AuthFormHandler from "../components/AuthComponents/AuthFormHandler";
import { AuthFormLocation } from "../enums";

export default function SignUpPage(){
   return(
      <main className="page auth-page signup">
         <h2>Create An Account</h2>
         <AuthFormHandler location={AuthFormLocation.SIGN_UP} />
      </main>
   )
}