import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react'

export default function InPageLoader(){
   return(
      <div color="#ff6600" className="inpage_loader">
         <CircularProgress color="inherit" />
      </div>
   )
}