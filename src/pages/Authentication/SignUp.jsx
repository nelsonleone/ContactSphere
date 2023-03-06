import { Link, useNavigate } from "react-router-dom";
import { useRef , useState, useEffect} from "react"; 
import Logo from "../../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import ErrorPara from "../../components/Helper/ErrorPara"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-features";
import { Alert } from "@mui/material"
import { authInputErrorChecker } from "../../components/Helper/authErrorHandler";
import authCurrentUserObj from "../../components/Helper/authCurrentUserObj";
import { renderGooglePopup } from "../../redux/features/userAuthSlice";
import { setLoading } from "../../redux/features/loadingSlice";


export default function SignUp(){

   const [showPrivacyInfo,setShowPrivacyInfo] = useState(false)
   const [formData,setFormData]  = useState({
      confirmSignupPassword:"",
      signupPassword:"",
      signupEmail:"",
   })
   const [error,setError] = useState({show:false,message:null})
   const [signUpSuccess,setSignUpSuccess] = useState({show:false,message:"Signed Up Successfully"})
   const [passwordMatch,setPasswordMatch] = useState(null)
   const navigate = useNavigate()
   const dispatch = useDispatch()


   useEffect(() => {
      if(signUpSuccess.show){
         dispatch(setLoading(true))
         const alertTimer = setTimeout(() => {
            setSignUpSuccess(prevState => {
               return {...prevState,show:false}
            })
            navigate("/")
            dispatch(setLoading(false))
         }, 3000)
         return () => clearTimeout(alertTimer)
      }
   },[signUpSuccess.show])


   async function handleSignUp(e){
      e.preventDefault()
      const email = formData.signupEmail;
      const password = formData.signupPassword;
      const confirmedPassword = formData.confirmSignupPassword;

      if(confirmedPassword !== password){
         setPasswordMatch(false)
         setError({show:true,message:"Passwords Don't Match"})
         return;
      }

      try{
         await createUserWithEmailAndPassword(auth,email,password)

         setSignUpSuccess(prevState => {
            return {...prevState,show:true}
         })
         dispatch(getEmailAndPasswordUser(authCurrentUserObj(auth.currentUser)))
      }
      catch(err){
         setError({show:true,message:authInputErrorChecker(err.code)})
      }
   }


   function handleInputChange(e){
      e.preventDefault()
      setError({show:false,message:null})
      const { name, value } = e.target;

      setFormData(prevState => {
         return {...prevState,[name]:value}
      })
   }

   return(
      <section className="signUp-section">
         <Logo className="authSection-logoview"/>
         <div className="signUp-section-inner">
            <h1>Create An Account With Us</h1>
            <p className="intro-para">
               <span>ContactSphere</span> provides a user friendly interface for storing and managing your contacts for a 
               long run.
            </p>
            <button 
              className={!showPrivacyInfo ? "privacy-info-btn" : "privacy-info-btn privacy-info-btn-toggled"}  
              aria-controls="privacy-info" 
              aria-expanded={showPrivacyInfo}
              onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
              >
               {
                  showPrivacyInfo ?
                  "Close Privacy Policy "
                  :
                  "Read Privacy Policy"
               }
               <img src="/images/icon-arrow-light.svg"  alt="" aria-hidden="true" />
            </button>
            {
               showPrivacyInfo &&           
               <p className="privacy-info" id="privacy-info">
                  We will never disclose any information from our users,
                  be it anything.
                  <span>
                     So feel free to use our site 
                     <img src="/images/emoji-smile.png" alt="" aria-hidden="true" />
                  </span>
               </p>
            }

            <form className="signUp-inputs">
               <div>
                  <label htmlFor="signUpEmail">Enter Your Email</label>
                  <input type="email" id="signUpEmail" name="signupEmail" value={formData.signUpEmail} onChange={handleInputChange} />
               </div>
               <div>
                  <label htmlFor="signUpPassword">Enter A Password</label>
                  <input type="password" id="signUpPassword" name="signupPassword" value={formData.signupPassword} onChange={handleInputChange}/>
               </div>
               <div>
                  <label htmlFor="confirmSignUpPassword">Confirm Password</label>
                  <input 
                     type="password" 
                     id="confirmSignUpPassword" 
                     name="confirmSignupPassword" 
                     value={formData.confirmSignupPassword}
                     className={!passwordMatch ? "password-match-error" : "password-match"}
                     onChange={handleInputChange}
                  />
               </div>
               {
                  error.show &&
                  <ErrorPara message={error.message} />
               }
               <button onClick={handleSignUp}>Create Account</button>
            </form>

            <div className="alt-authActions">
               <Link to="/signin">Sign In</Link>
               <button onClick={() => dispatch(renderGooglePopup())}>
                  <span>Google Sign Up</span>
                  <img src="/images/googleIcon.webp" alt="google icon" />
               </button>
            </div>
         </div>


         {
            signUpSuccess.show &&
            <Alert severity="success" className="alert-box">{signUpSuccess.message}</Alert>
         }
      </section>
   )
}