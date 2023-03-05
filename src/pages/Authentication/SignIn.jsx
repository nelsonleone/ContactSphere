import { useRef, useState, useEffect } from "react"
import Logo from "../../components/Logo"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { auth } from "../../firebase/firebase-features"
import { Alert } from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import { authInputErrorChecker } from "../../components/Helper/authErrorHandler"
import { useDispatch, useSelector } from "react-redux"
import authCurrentUserObj from "../../components/Helper/authCurrentUserObj"
import { getEmailAndPasswordUser, renderGooglePopup } from "../../redux/features/userAuthSlice"
import ErrorPara from "../../components/Helper/ErrorPara"
import { setLoading } from "../../redux/features/loadingSlice"



export default function SignIn(){

   const [formData ,setFormData] = useState({
      signInEmail:"",
      signInPassword:""
   })
  const dispatch = useDispatch()
  const [error,setError] = useState({show:false,message:null})
  const [signInSuccess,setSignInSuccess] = useState({show:false,message:"Sign In Successful"})
  const { beenAuthenticated }  = useSelector(store => store.userAuth)
  const { isLoading } = useSelector(store => store.loading)
  const navigate = useNavigate()

  
  async function handleSignIn(e){
     e.preventDefault()  
     const email = formData.signInEmail;
     const password = formData.signInPassword;

     try{
        await signInWithEmailAndPassword(auth,email,password)
         dispatch(getEmailAndPasswordUser(authCurrentUserObj(auth.currentUser)))

      }
      catch(err){
         const errorMessage = authInputErrorChecker(err.code)
         setError({show:true,message:errorMessage})
      }
   }

   function handleChange(e){
      setError({show:false,message:null})
      const { name,value }  = e.target;

      setFormData(prevState => {
         return {...prevState,[name]:value}
      })
   }
 
   useEffect(() => {
      if(!beenAuthenticated)return;
      dispatch(setLoading(true))
      const alertTimer = setTimeout(() => {
         setSignInSuccess(prevState => {
            return {...prevState,show:false}
         })
         navigate("/")
         dispatch(setLoading(false))
      }, 3000)

      return () => clearTimeout(alertTimer)
   },[beenAuthenticated])
  

   return(
      !isLoading && 
      <section className="signIn-section">
         <Logo className="authSection-logoview"/>
         <div className="signIn-section-inner">
            <h1>Sign In</h1>
            <div>
               <img src="/images/userIcon.webp" alt="" aria-hidden="true"/>
               <form className="signIn-inputs">
                  <div>
                     <label htmlFor="signInEmail">Enter Your Email</label>
                     <input type="email" id="signInEmail" name="signInEmail" value={formData.signInEmail} onChange={handleChange} />
                  </div>
                  <div>
                     <label htmlFor="signInPassword">Enter Your Password</label>
                     <input type="password" id="signInPassword" name="signInPassword" value={formData.signInPassword} onChange={handleChange} />
                  </div>
                  {
                     error.show &&
                     <ErrorPara message={error.message} />
                  }
                  <div className="flex-row">
                    <button onClick={handleSignIn}>Sign In</button>
                    <Link to="/auth/forgotten-password" className="forgotten-password-link">Forgotten Password</Link>
                  </div>
               </form>

               <div className="alt-authActions">
                  <Link to="/signup">Sign Up</Link>
                  <button onClick={() => dispatch(renderGooglePopup())}>
                     <span>Continue With Google</span>
                     <img src="/images/googleIcon.webp" alt="google icon" />
                  </button>
               </div>
            </div>
         </div>
      </section>
   )
}