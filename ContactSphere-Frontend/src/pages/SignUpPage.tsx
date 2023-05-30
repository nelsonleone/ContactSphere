import AuthForm from "../components/AuthForm";

export default function SignUpPage(){
   return(
      <section className="auth-page signin">
         <h2>Create An Account</h2>
         <AuthForm location="signup" />
      </section>
   )
}