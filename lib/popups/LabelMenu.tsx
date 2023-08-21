import * as React from 'react';
import Divider from '@mui/material/Divider';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { MdLabelOutline } from 'react-icons/md'
import { BiPlus } from 'react-icons/bi'
import { ClickAwayListener } from '@mui/base';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Control, useFieldArray, UseFieldArrayAppend } from 'react-hook-form'
import { Contact } from '../../src/vite-env';
import { AlertSeverity, InputPropertyValueName } from '../../src/enums'
import handleAsyncAddLabel from '../../src/utils/helperFns/handleAsyncAddLabel';
import { useManageLabelsMutation, useManageMultiContactLabelsMutation } from '../../src/RTK/features/api/injectedContactsApiQueries';
import { setShowAlert } from '../../src/RTK/features/slices/alertSlice';
import stopUnauthourizedActions from '../../src/utils/helperFns/stopUnauthourizedActions';


interface ILabelMenuProps { 
   showLabelMenu: boolean, 
   setShowLabelMenu:React.Dispatch<React.SetStateAction<boolean>>,
   control?:  Control<Contact, any>,
   setOpenAddLabelModal: React.Dispatch<React.SetStateAction<boolean>>,
   labelsArray: Contact['labelledBy'],
   labelMenuFor: "contactPage" | "contactForm",
   contactId?: string,
   phoneNumber?: string
}

function LabelMenu(props:ILabelMenuProps) {
   
   const {
      showLabelMenu,
      setShowLabelMenu,
      control,
      setOpenAddLabelModal,
      labelsArray,
      labelMenuFor,
      contactId,
      phoneNumber
   } = props;

   const { labels } = useAppSelector(state => state.userData)

   let append:UseFieldArrayAppend<Contact, "labelledBy" | "relatedPeople">
   if (control){
      append = useFieldArray<Contact>({ control, name: InputPropertyValueName.LabelledBy }).append;
   }
   const [manageLabels] = useManageLabelsMutation()
   const [manageMultipleLabels] = useManageMultiContactLabelsMutation()
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const dispatch = useAppDispatch()

   const handleClickAway = () => {
      setShowLabelMenu(false)
   }
   
   const handleAddLabel = async (e:React.MouseEvent<HTMLLIElement>,label:string) => {
      e.stopPropagation()
      const labelAlreadyAdded = labelsArray.some(field => field.label === label)
      if (labelAlreadyAdded){
         setShowLabelMenu(false)
         return;
      }
      
      if(labelMenuFor === "contactForm"){
         append({label})
         setShowLabelMenu(false)
      }

      else if(labelMenuFor === "contactPage"){
         setShowLabelMenu(false)
         try{
            if(!contactId || !phoneNumber){
               throw new Error("Incomplete properties passed, 'contactId or phoneNumber was not passed'")
            }
            await stopUnauthourizedActions(uid)
            await handleAsyncAddLabel(
               dispatch,
               "add",
               contactId,
               uid!,
               "single",
               [],
               label,
               phoneNumber,
               manageLabels,
               manageMultipleLabels
            )
         }
         catch(err:any|unknown){
            dispatch(setShowAlert({
               alertMessage: err.message || "Error Occured Adding Label",
               severity: AlertSeverity.ERROR
            }))
         }
      }
   }

   return (
      showLabelMenu ?
      <ClickAwayListener
         mouseEvent="onMouseDown"
         touchEvent="onTouchStart"
         onClickAway={handleClickAway}
         >
         <Paper sx={{ width: 220 }} className="label_menu">
            <MenuList>

               {
                  labels.length ? labels.map(value => (
                     <MenuItem className="label flex-row" key={value._id} onClick={(e) => handleAddLabel(e,value.label)}>
                        <ListItemIcon>
                           <MdLabelOutline  />
                        </ListItemIcon>
                        <span>{value.label}</span>
                     </MenuItem>
                  ))
                  :
                  <p>You have no saved <i>Label</i></p>
               }
               <Divider />
               <MenuItem onClick={()  => setOpenAddLabelModal(prevState => prevState = !prevState)}>
                 <ListItemIcon>
                   <BiPlus />
                 </ListItemIcon>
                  <ListItemText style={{fontSize:'.9rem'}}>Create Label</ListItemText>
               </MenuItem>
            </MenuList>
         </Paper>
      </ClickAwayListener>
      :
      null
   )
}

export default React.memo(LabelMenu)