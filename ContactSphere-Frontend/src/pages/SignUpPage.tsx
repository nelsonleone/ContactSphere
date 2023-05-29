import AuthForm from "../components/AuthForm";

export default function SignUpPage(){
   return(
      <section className="auth-page signin">
         <h1>Create An Account</h1>
         <AuthForm location="signup" />
      </section>
   )
}