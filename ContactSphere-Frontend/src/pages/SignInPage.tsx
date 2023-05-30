import AuthForm from "../components/AuthForm";

export default function SignInPage(){
   return(
      <section className="auth-page signin">
         <h2>Welcome Back</h2>
         <AuthForm location="signin" />
      </section>
   )
}