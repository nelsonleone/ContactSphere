import React , {  Dispatch, SetStateAction, useEffect, useState}  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddLabelMutation } from '../../src/RTK/features/injectedContactsApiQueries';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import LoadingButton from '../buttons/LoadingButton';
import { UseFieldArrayAppend } from "react-hook-form";
import { Contact, ILabelObj } from "../../src/vite-env";
import postCreatedLabel from '../../src/utils/helperFns/postCreatedLabel';

interface IDialogProps {
   setOpen: Dispatch<SetStateAction<boolean>>,
   open: boolean,
   labelsArray?: Contact['labelledBy'],
   setLabelForEdit?: Dispatch<SetStateAction<ILabelObj>>,
   handleLabelEdit?: ()  => void,
   labelForEdit?: string,
   append?: UseFieldArrayAppend<Contact, "labelledBy" | "relatedPeople">
}

export default function AddLabelDialog(props:IDialogProps) {

   const {  open, setOpen, labelsArray, append } = props;
   const [addLabel,{ isLoading }] = useAddLabelMutation()
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const [label,setLabel] = useState("")
   const dispatch = useAppDispatch()


   // Set Label For Edit Value 
   useEffect(() => {
      if(props.setLabelForEdit){
         props.setLabelForEdit(prevState => ( { ...prevState, label } ))
      }
   },[label])

   const handleAddLabel = () => {
      if(!uid)return;

      // Set Editted Label Value And Close Modal
      if(props.handleLabelEdit){
         props.handleLabelEdit()
         setOpen(false)
         return;
      }

      if (labelsArray && append){
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
         <DialogTitle>{props.labelForEdit ? "Edit Label" : "Create Label"}</DialogTitle>
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
               // Use Edit Value In Edit Mode
               value={props.labelForEdit ? props.labelForEdit : label}
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