import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
   open: boolean,
   setOpen: React.Dispatch<React.SetStateAction<boolean>>,
   action: () => void,
   btnText1?: string,
   btnText2?: string,
   dialogTitle: string,
   dialogText: string
}

export default function CustomSimpleDialog(props:IProps) {

   const { open, setOpen, action, btnText1, btnText2, dialogTitle, dialogText } = props;

   return (
     <Dialog open={open} onClose={() => setOpen(false)} className="custom_simple_dialog">
         <DialogTitle className="custom_simple_dialog_title">{dialogTitle}</DialogTitle>
         <DialogContent>
            <DialogContentText className="custom_simple_dialog_content">
               {dialogText}
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={() => setOpen(false)}>{btnText1 || "Cancel"}</Button>
            <Button onClick={action}>{btnText2 || "Proceed"}</Button>
         </DialogActions>
      </Dialog>
   )
}