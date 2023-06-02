import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { hideSnackbar } from '../../src/RTK/features/snackbarDisplaySlice';


export default function CustomSnackbar() {

   const { showSnackbar, snackbarMessage } = useAppSelector(store => store.snackbar)
   const dispatch = useAppDispatch()

   const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }

      dispatch(hideSnackbar())
   }

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
         autoHideDuration={6000}
         onClose={handleClose}
         message={snackbarMessage}
         action={action}
         style={{backgroundColor: "#d85a06",color:"#FAFAFA"}}
      />
   )
}
