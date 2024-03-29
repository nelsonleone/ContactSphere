import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { setHideAlert } from '../../src/RTK/features/slices/alertSlice';
import { useLocation } from 'react-router-dom';

export default function CustomAlert() {
  const { severity, alertMessage, showAlert } = useAppSelector(store => store.alert)
  const dispatch = useAppDispatch()
  const location = useLocation()

  React.useEffect(() => {
      const hideTimer = setTimeout(() => {
         dispatch(setHideAlert())
      }, 6000)

      return () => clearTimeout(hideTimer)
   },[showAlert,location.pathname])

  return (
   showAlert ?
   <Collapse in={showAlert}>
      <Alert  
         className="custom_alert"
         severity={severity}
         action={
         <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
               dispatch(setHideAlert())
            }}
         >
            <CloseIcon fontSize="inherit" />
         </IconButton>
         }
         sx={{ mb: 2 }}
      >
         {alertMessage}
      </Alert>
   </Collapse>
   : 
   null
  )
}