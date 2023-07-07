import AuthFormHandler from "../components/AuthComponents/AuthFormHandler";
import PageWrapper from "../components/PageWrapper";
import { AuthFormLocation } from "../enums";

export default function SignUpPage(){
   return(
      <PageWrapper className="auth-page signup" desc="create a contactsphere account" title="ContactSphere | Create Account">
         <h2>Create An Account</h2>
         <AuthFormHandler location={AuthFormLocation.SIGN_UP} />
      </PageWrapper>
   )
}