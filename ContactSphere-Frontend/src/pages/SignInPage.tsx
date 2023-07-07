import AuthFormHandler from "../components/AuthComponents/AuthFormHandler";
import PageWrapper from "../components/PageWrapper";
import { AuthFormLocation } from "../enums";

export default function SignInPage(){

   return(
      <PageWrapper className="auth-page signin" desc="sign into your contactsphere account" title="ContactSphere | Login">
         <main>
            <h2>Welcome Back</h2>
            <AuthFormHandler location={AuthFormLocation.SIGN_IN} />
         </main>
      </PageWrapper>
   )
}