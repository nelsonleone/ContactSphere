import React , {  Dispatch, SetStateAction, useState}  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddLabelMutation } from '../../src/RTK/features/injectedContactsApiQueries';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { InputPropertyValueName } from '../../src/enums';
import LoadingButton from '../buttons/LoadingButton';
import {  Control , useFieldArray} from "react-hook-form";
import { Contact } from "../../src/vite-env";
import postCreatedLabel from '../../src/utils/helperFns/postCreatedLabel';

interface IDialogProps {
   setOpen: Dispatch<SetStateAction<boolean>>,
   open: boolean,
   control?: Control<Contact,any>,
   labelsArray?: Contact['labelledBy']
}

export default function AddLabelDialog(props:IDialogProps) {

   const {  open, setOpen, control, labelsArray } = props;
   const [addLabel,{ isLoading }] = useAddLabelMutation()
   const { append } = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy })
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const [label,setLabel] = useState("")
   const dispatch = useAppDispatch()

   const handleAddLabel = () => {
      if (labelsArray && control){
         // Dialog Being Used In Contact Form
         const labelArrayExists = labelsArray?.some(val => val.label === label)
      
         if (!labelArrayExists){
            append({label})
         }
      }
               
      // Add the Label to the user's data in database 
      postCreatedLabel(addLabel,dispatch,label,uid) 
      setOpen(false)
   }


  return (
      <Dialog open={open} onClose={()=> setOpen(false)}>
         <DialogTitle>Create Label</DialogTitle>
         <DialogContent sx={{width:"20em"}}>
            <TextField
               autoFocus
               margin="dense"
               id="create-label"
               label="Label"
               type="text"
               variant="standard"
               className="textField add_label_dialog_input"
               onChange={(e) => setLabel(e.target.value)}
            />
         </DialogContent>
         <DialogActions>
            <Button type="button" className="add_label_dialog_btn" onClick={() => setOpen(false)}>Cancel</Button>
            <LoadingButton 
               buttonText="SAVE" 
               className="add_label_dialog_btn"
               buttonType="button"
               loading={isLoading}
               handleClick={handleAddLabel}
             />
         </DialogActions>
      </Dialog>
   )
}