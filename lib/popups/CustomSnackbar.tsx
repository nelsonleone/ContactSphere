import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { hideSnackbar } from '../../src/RTK/features/slices/snackbarDisplaySlice';
import { useLocation } from 'react-router-dom';


export default function CustomSnackbar() {

   const { showSnackbar, snackbarMessage } = useAppSelector(store => store.snackbar)
   const dispatch = useAppDispatch()
   const location = useLocation()

   const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      event.stopPropagation()
      if (reason === 'clickaway') {
         return;
      }

      dispatch(hideSnackbar())
   }

   React.useEffect(() => {
      const hideTimer = setTimeout(() => {
         dispatch(hideSnackbar())
      }, 4000)

      return () => clearTimeout(hideTimer)
   },[showSnackbar,location.pathname])


   const action = (
      <IconButton
         size="small"
         aria-label="close"
         color="inherit"
         onClick={handleClose}
       >
       <CloseIcon fontSize="small" />
      </IconButton>
   )

   return (
      <Snackbar
         open={showSnackbar}
         className="custom-snackbar"
         autoHideDuration={6000}
         onClose={handleClose}
         message={snackbarMessage}
         action={action}
      />
   )
}
