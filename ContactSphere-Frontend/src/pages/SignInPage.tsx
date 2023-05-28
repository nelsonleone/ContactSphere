import AuthForm from "../components/AuthForm";

export default function SignInPage(){
   return(
      <section className="auth-page signin">
         <h1>Welcome Back</h1>
         <AuthForm location="signin" />
      </section>
   )
}