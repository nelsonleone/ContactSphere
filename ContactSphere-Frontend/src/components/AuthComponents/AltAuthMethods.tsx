import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import { useAppDispatch } from '../../customHooks/reduxCustomHooks';
import { useAuthorizeUserMutation } from '../../RTK/features/injectedAuthApiQueries';
import googleAuthHandler from '../../firebaseClient/googleAuthHandler';
import { auth } from '../../firebaseClient/firebaseInit';
import { setUserDetails } from '../../RTK/features/authUserSlice';
import { setShowAlert } from '../../RTK/features/alertSlice';
import { AlertSeverity, AuthMethod } from '../../enums';
import handlePostCredentials from '../../utils/helperFns/handlePostCredentials';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AltAuthMethods() {

   const dispatch = useAppDispatch()
   const [authorizeUser, {isLoading}] = useAuthorizeUserMutation()
   const navigate = useNavigate()
   const [idToken,setIdToken] = useState("")

  const handleClick = async(authType:string) => {
     try{
         const userDetails = authType === "google" ? await googleAuthHandler() : "";
         handlePostCredentials(idToken,authorizeUser)
         
         if(!userDetails){
            //  precaution
            throw new Error("An Error Occurred, Try again")
         }
         dispatch(setUserDetails({
            ...userDetails,
            authMethod: AuthMethod.Google
         }))
         const token = await auth?.currentUser?.getIdToken() || '';
         handlePostCredentials(token,authorizeUser)
         setIdToken(token)
         navigate("/")


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
      // remove default firebase browser persisted user
       auth.signOut()
      }
  }


  return (
      <div className='alt_auth_methods'>
         <h3>Continue With..</h3>
         <Button startIcon={<FcGoogle />} onClick={() => handleClick("google")} disabled={isLoading}>
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