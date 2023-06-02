import AuthForm from "../components/AuthForm";
import { AuthFormLocation } from "../enums";

export default function SignUpPage(){
   return(
      <section className="auth-page signup">
         <h2>Create An Account</h2>
         <AuthForm location={AuthFormLocation.SIGN_UP} />
      </section>
   )
}