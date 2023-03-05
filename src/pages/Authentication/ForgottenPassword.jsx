import Logo from "../../components/Logo";
import { useState, useEffect } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-features";
import ErrorPara from "../../components/Helper/ErrorPara";


export default function ForgottenPassword(){

   const ALERT_NULL_OBJ = {show:false,message:null}
   const [userResetEmail,setUserResetEmail]= useState("")
   const [error,setError]= useState(ALERT_NULL_OBJ)
   const [success,setSuccess]= useState(ALERT_NULL_OBJ)
   const navigate = useNavigate()

   async function handleSendResetPasswordEmail(){
      try{
         await sendPasswordResetEmail(auth,userResetEmail)
         setSuccess({show:true,message:"Check Your Input To Reset Password"})
      }
      catch(err){
         console.log(err.code)
         setError({show:true,message:err.code.substring(5)})
      }
   }

   function handleInputChange(e){
      setError(ALERT_NULL_OBJ)
      setSuccess(ALERT_NULL_OBJ)
      setUserResetEmail(e.target.value)
   }

   useEffect(() => {
      let alertTimer;
      if(success.show){
         alertTimer = setTimeout(() => {
            setSuccess({show:false,message:null})
            navigate("/auth/Signin")
         }, 3000)

      }

      else if(error.show){
         alertTimer = setTimeout(() => {
            setError({show:false,message:null})
         }, 5000)
      }

      return () => clearTimeout(alertTimer)
   },[success.show,error.show])

   return(
      <section className="forgotten-password">
         <Logo className="authSection-logoview"/>
         <div className="forgotten-password-inner">
            <h2>Forgotten Password</h2>
            <div>
               <label htmlFor="fp-email">Enter Your Email</label>
               <input 
                  type="email"
                  name="reset-email-input"
                  id="fp-email"
                  onChange={handleInputChange}
               /> 
               {
                  error.show && 
                  <ErrorPara message={error.message} />
               }
               <button onClick={handleSendResetPasswordEmail}>Reset Password</button>
            </div>
         </div>

         {
            success.show &&
            <Alert severity="success" className="alert-box">{success.message}</Alert>
         }
      </section>
   )
}