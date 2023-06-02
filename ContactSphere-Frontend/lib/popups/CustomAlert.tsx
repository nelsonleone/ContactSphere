import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { hideAlert } from '../../src/RTK/features/alertSlice';

export default function CustomAlert() {
  const { severity, alertMessage, showAlert } = useAppSelector(store => store.alert)
  const dispatch = useAppDispatch

  return (
   showAlert ?
   <Collapse in={showAlert}>
      <Alert
         severity={severity}
         action={
         <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
               dispatch(hideAlert())
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
   ""
  )
}