import React , {  Dispatch, SetStateAction, useState}  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddLabelMutation } from '../../src/RTK/features/injectedContactsApiQueries';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { setShowAlert } from '../../src/RTK/features/alertSlice';
import { AlertSeverity } from '../../src/enums';

interface IDialogProps {
   setOpen: Dispatch<SetStateAction<boolean>>,
   open: boolean
}

export default function AddLabelDialog(props:IDialogProps) {

   const {  open, setOpen } = props;
   const [addLabel,{}] = useAddLabelMutation()
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const [label,setLabel] = useState("")
   const dispatch = useAppDispatch()

   const handleClose = async() => {
      try{
         if (uid){
            await addLabel({ authUserUid: uid,label })
         }
         else{
            throw new Error("Unauthourized Request")
         }
      }

      catch(err){
         dispatch(setShowAlert({
            alertMessage: "Error Occured While Adding Label",
            severity: AlertSeverity.ERROR
         }))
      }
      setOpen(false)
   }

  return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle>Create Label</DialogTitle>
         <DialogContent sx={{width:"20em"}}>
            <TextField
               autoFocus
               margin="dense"
               id="create-label"
               label="Label"
               type="text"
               variant="standard"
               onChange={(e) => setLabel(e.target.value)}
            />
         </DialogContent>
         <DialogActions>
            <Button type="button" onClick={handleClose}>Cancel</Button>
            <Button type="button" onClick={handleClose}>Save</Button>
         </DialogActions>
      </Dialog>
   )
}