import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaPhoneAlt } from 'react-icons/fa';
import { useAppDispatch } from '../../customHooks/reduxCustomHooks';
import { useAuthorizeUserMutation } from '../../RTK/features/injectedAuthApiQueries';
import googleAuthHandler from '../../firebaseClient/googleAuthHandler';
import { auth } from '../../firebaseClient/firebaseInit';
import { setUserDetails } from '../../RTK/features/authUserSlice';
import { setShowAlert } from '../../RTK/features/alertSlice';
import Cookies from 'js-cookie';
import { AlertSeverity } from '../../enums';
import { MouseEvent} from 'react';


function AltAuthMethods() {

   const dispatch = useAppDispatch()
   const [authorizeUser, {isLoading}] = useAuthorizeUserMutation()

  const handleClick = async(authType:string) => {
     try{
         const userDetails = authType === "google" ? await googleAuthHandler() : "";

         const idToken = await auth?.currentUser?.getIdToken() || '';
         const csrfToken = Cookies.get('csrfToken') || '';
         await authorizeUser({idToken,csrfToken})

         if(!userDetails){
            //  precaution
            throw new Error("An Error Occurred, Try again")
         }

         dispatch(setUserDetails(userDetails))
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
            onClick={() => dispatch(setShowAlert({alertMessage:"Phone Number Sign-In IS Disabled",severity:AlertSeverity.ERROR}))}>
            Phone Number
         </Button>
      </div>
  )
}

export default AltAuthMethods;