import { useAppDispatch, useAppSelector } from '../customHooks/reduxCustomHooks'
import { Button } from '@mui/material'
import { useSetAuthSignOutMutation } from '../RTK/features/injectedAuthApiQueries'
import { setShowAlert } from '../RTK/features/alertSlice'
import PhotoUrlAvatar from '../../lib/Avatars/PhotoUrlAvatar'
import { AlertSeverity } from '../enums'
import { CgLogOut } from 'react-icons/cg'
import { UsedHOC } from '../vite-env'
import { memo } from 'react'
import OutsideClicksHandler from './HOCs/OutsideClicksHandler'


function UserMenu(props:UsedHOC){

   const { userDetails: {
      displayName,
      email,
      photoURL
   } } = useAppSelector(store => store.authUser)
   const { beenAuthenticated }  = useAppSelector(store => store.authUser)

   const [setAuthSignOut, {isLoading:signingOut}] = useSetAuthSignOutMutation()
   const dispatch = useAppDispatch()


   const handleUserSignOut = async() => {
      try{
         await setAuthSignOut()
         dispatch(setShowAlert(
            {
              alertMessage: "User Signed-Out Successfully",
              severity: AlertSeverity.SUCCESS
            }
         ))
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
      <div className="user-menu">
         <PhotoUrlAvatar nameForAlt={displayName || ''} photoURL={photoURL || ''} />
         <p>{displayName}</p>
         <span>{email}</span>

         <Button endIcon={<CgLogOut />} disabled={signingOut} onClick={handleUserSignOut}>
            <span>Sign Out</span>
         </Button>
      </div>
      :
      <p>No Currently Signed In User</p>
   )
}

export default memo(OutsideClicksHandler(UserMenu))