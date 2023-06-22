import { useAppDispatch, useAppSelector } from '../customHooks/reduxCustomHooks'
import { Button, Card } from '@mui/material'
import { useSetAuthSignOutMutation } from '../RTK/features/injectedAuthApiQueries'
import { setShowAlert } from '../RTK/features/alertSlice'
import PhotoUrlAvatar from '../../lib/Avatars/PhotoUrlAvatar'
import { AlertSeverity } from '../enums'
import { CgLogOut } from 'react-icons/cg'
import { memo } from "react";
import { useNavigate } from 'react-router-dom'


function UserMenu(){

   const { userDetails: {
      displayName,
      email,
      photoURL
   } } = useAppSelector(store => store.authUser)
   const { beenAuthenticated }  = useAppSelector(store => store.authUser)

   const [setAuthSignOut, {isLoading:signingOut}] = useSetAuthSignOutMutation()
   const dispatch = useAppDispatch()
   const navigate = useNavigate()


   const handleUserSignOut = async() => {
      try{
         await setAuthSignOut()
         dispatch(setShowAlert(
            {
              alertMessage: "User Signed-Out Successfully",
              severity: AlertSeverity.SUCCESS
            }
         ))

         navigate("/auth/signin")
      }

      catch(err){
        dispatch(setShowAlert(
          {
            alertMessage: "Error Occured While Logging Out",
            severity: AlertSeverity.ERROR
          }
        ))  
      }
   } 

   return(
      beenAuthenticated ?
      <Card variant="elevation" className="user-menu" id="user-menu">
         <PhotoUrlAvatar nameForAlt={displayName || ''} photoURL={photoURL || ''} />
         <p>{displayName}</p>
         <span>{email}</span>

         <Button variant="text" type="button" endIcon={<CgLogOut />} disabled={signingOut} onClick={handleUserSignOut}>
            <span>Sign Out</span>
         </Button>
      </Card>
      :
      <p 
         role="alert" 
         style={
            {
               color: "#af2121",
               textTransform: "uppercase", 
               textAlign: "center",
               position:"fixed",
               top:"5em",
               left: "20%",
            }
         }
        >
         No Currently Signed In User
      </p>
   )
}

export default memo(UserMenu)