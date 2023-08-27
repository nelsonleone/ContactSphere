import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import { useAppDispatch } from '../../customHooks/reduxCustomHooks';
import googleAuthHandler from '../../firebaseClient/googleAuthHandler';
import { setUserDetails } from '../../RTK/features/slices/authUserSlice';
import { setShowAlert } from '../../RTK/features/slices/alertSlice';
import { AlertSeverity, AuthMethod } from '../../enums';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function AltAuthMethods() {

   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const [loading,setLoading] = useState(false)

  const handleClick = async(authType:string) => {
     
     setLoading(true)

     try{
         const userDetails = authType === "google" ? await googleAuthHandler() : "";
         
         if(!userDetails){
            //  precaution
            throw new Error("An Error Occurred, Try again")
         }
         dispatch(setUserDetails({
            ...userDetails,
            authMethod: AuthMethod.Google
         }))

         navigate('/')

         dispatch(setShowAlert(
            {
               alertMessage:"Signed In Successfully",
               severity: AlertSeverity.SUCCESS
            }
         ))
      }

      catch(err:unknown|any){
         dispatch(setShowAlert(
            {
               alertMessage: err?.data?.message || err?.message || "An Error Occured, Try Again",
               severity: AlertSeverity.ERROR
            }
         ))
      }

      finally{
         setLoading(false)
      }
  }


  return (
      <div className='alt_auth_methods'>
         <h3>Continue With..</h3>
         <Button startIcon={<FcGoogle />} onClick={() => handleClick("google")} disabled={loading}>
            Google
         </Button>


         {/* Phone number signup is disabled at the momemt  */}
         <Button 
            startIcon={ <FaPhoneAlt />} 
            onClick={() => dispatch(setShowAlert({alertMessage:"Phone Number Sign-In Is Disabled",severity:AlertSeverity.ERROR}))}>
            Phone Number
         </Button>
      </div>
  )
}

export default AltAuthMethods;