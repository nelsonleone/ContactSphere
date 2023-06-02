import AuthForm from "../components/AuthForm";
import { AuthFormLocation } from "../enums";

export default function SignInPage(){

   return(
      <section className="auth-page signin">
         <h2>Welcome Back</h2>
         <AuthForm location={AuthFormLocation.SIGN_IN} />
      </section>
   )
}