import AuthFormHandler from "../components/AuthComponents/AuthFormHandler";
import PageWrapper from "../components/PageWrapper";
import { AuthFormLocation } from "../enums";

export default function SignUpPage(){
   return(
      <PageWrapper className="auth_page signup" title="ContactSphere | Create Account">
         <main>
            <h2>Create An Account</h2>
            <AuthFormHandler location={AuthFormLocation.SIGN_UP} />
         </main>
      </PageWrapper>
   )
}