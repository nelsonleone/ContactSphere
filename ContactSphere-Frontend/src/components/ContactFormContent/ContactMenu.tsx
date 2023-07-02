import { BiArchiveIn, BiPlus } from 'react-icons/bi'
import { BsTrash3Fill } from 'react-icons/bs'
import { MdLabelOutline } from 'react-icons/md'
import { useAppSelector, useAppDispatch } from '../../customHooks/reduxCustomHooks';
import { ContactMenuButton } from '../../../lib/with-tooltip';
import { MouseEvent, SetStateAction, Dispatch, useEffect, useState } from 'react';
import { useDeleteContactMutation, useDeleteMultipleContactsMutation, useHideContactMutation, useHideMultipleContactsMutation, useManageLabelsMutation, useManageMultiContactLabelsMutation } from '../../RTK/features/injectedContactsApiQueries';
import { AlertSeverity } from '../../enums';
import { setShowAlert } from '../../RTK/features/alertSlice';
import { setHideWrkSnackbar, setShowWrkSnackbar } from '../../RTK/features/wrkSnackbarSlice';
import { setShowSnackbar } from '../../RTK/features/snackbarDisplaySlice';
import { Divider, Menu, MenuItem } from '@mui/material';
import { ListItemIcon, ListItemText, MenuList } from '@mui/material';
import { setEdittedContact } from '../../RTK/features/userDataSlice';

interface IProps {
   contactLabels?: {
      label: string
   }[],
   contactId?: string,
   method: "single" | "multi",
   id?: string,
   ariaLabelledBy?: string,
   setOpenDialog?: Dispatch<SetStateAction<boolean>>
}

export default function ContactMenu(props:IProps){

   const { labels:userSavedLabels } = useAppSelector(store => store.userData)
   const uid = useAppSelector(store =>  store.authUser.userDetails.uid)
   const [manageLabels] = useManageLabelsMutation()
   const dispatch = useAppDispatch()
   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const [manageMultiContactsLabels] = useManageMultiContactLabelsMutation()
   const [deleteContact] = useDeleteContactMutation()
   const [deleteMultiple] = useDeleteMultipleContactsMutation()
   const [hideContact] = useHideContactMutation()
   const [hideMultipleContacts] = useHideMultipleContactsMutation()

   const handleAddLabel = async(e:React.MouseEvent<{}>,label:string) => {
      e.stopPropagation()
      setAnchorEl(null)
      dispatch(setShowWrkSnackbar())

      // Contact Menu Used In Individual Contacts
      try{
         if(!uid){
            throw new Error("Unauthourized request, please login")
         }
   
         if(props.contactId && props.method === "single"){
            const updatedContact = await manageLabels({
               authUserUid: uid,
               label,
               contactId:props.contactId,
               actionType: "add"
            }).unwrap()

            // Update Specific Contact In State
            dispatch(setEdittedContact(updatedContact))
         }
         else if(props.method === "multi"){
            await manageMultiContactsLabels({
               authUserUid: uid,
               label,
               selectedContacts
            })
         }

         dispatch(setShowSnackbar({
            snackbarMessage: `${label} Label Has Been Set`
         }))
      }

      catch(err:any|unknown){
         dispatch(setShowAlert({
            alertMessage: err.message,
            severity: AlertSeverity.ERROR
         }))
      }

      finally{
         dispatch(setHideWrkSnackbar())
      }
   }

   const [unregisteredLabels,setUnregisteredLabels] = useState(userSavedLabels?.filter(item => props.contactLabels?.some(obj => obj.label === item.label)))
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
     setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
     setAnchorEl(null)
   }

   const handleMenuHideContact = async() => {
      try{
         if(!uid){
            throw new Error("Unauthourized Request, Please Login")
         }

         dispatch(setShowWrkSnackbar())

         if(props.method === "single"){
            await hideContact({
               authUserUid: uid,
               contactId: props.contactId || '',
               status: true
            })
         }

         else if(props.method === "multi"){
            await hideMultipleContacts({
               selectedContacts,
               authUserUid: uid,
               status: true
            })
         }

         dispatch(setShowSnackbar({
            snackbarMessage:"Succefully Deleted"
         }))
      }

      catch(err){
         dispatch(setShowAlert({
            alertMessage: "Error Occured During Deletion",
            severity: AlertSeverity.ERROR
         }))
      }

      finally{
         dispatch(setHideWrkSnackbar())
      }
   }




   const handleMenuDeleteContact = async () => {      
      try{
         if(!uid){
            throw new Error("Unauthourized Request, Please Login")
         }

         dispatch(setShowWrkSnackbar())
         if(props.method === "single"){
            await deleteContact({
               authUserUid: uid,
               contactId: props.contactId || ''
            })
         }

         else if(props.method === "multi"){
            await deleteMultiple({
               selectedContacts,
               authUserUid: uid
            })
         }
         dispatch(setShowSnackbar({
            snackbarMessage:"Succefully Deleted"
         }))
      }

      catch(err){
         dispatch(setShowAlert({
            alertMessage: "Error Occured During Deletion",
            severity: AlertSeverity.ERROR
         }))
      }

      finally{
         dispatch(setHideWrkSnackbar())
      }
   }

   useEffect(() => {
      setUnregisteredLabels(userSavedLabels.filter(item => props.contactLabels?.some(obj => obj.label !== item.label)))
   },[props.contactLabels?.length,userSavedLabels?.length])

   return(
         <>
            <ContactMenuButton ariaExpanded={open} ariaControls={props.id || 'contact-menu'} tooltipText='More actions' openContactMenu={(e) => handleClick(e)} />
            <Menu 
              className="contact_menu"
              id={props.id || "contact-menu"}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': props.ariaLabelledBy || "contact-menu",
              }}
              >
               <MenuList>
                  <MenuItem onClick={handleMenuHideContact}>
                     <ListItemIcon>
                        <BiArchiveIn />
                     </ListItemIcon>
                     <ListItemText>{props.method === "single" ? "Hide Contact" : "Hide From Contacts"}</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuDeleteContact}>
                     <ListItemIcon>
                        <BsTrash3Fill />
                     </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                  </MenuItem>
                  <Divider />
                  <span className="menu-item-label">{ props.method === "multi" ? "Manage" : "Change"} Labels</span>
                  
                  {
                     props.method === "single" && unregisteredLabels.length ? unregisteredLabels.map(value => (
                        <MenuItem className="label flex-row" key={value._id} onClick={(e) => handleAddLabel(e,value.label)}>
                           <ListItemIcon>
                              <MdLabelOutline  />
                           </ListItemIcon>
                           <span>{value.label}</span>
                        </MenuItem>
                     ))
                     :
                     props.method === "multi" && userSavedLabels?.length ? userSavedLabels.map(value => (
                        <MenuItem className="label flex-row" key={value._id} onClick={(e) => handleAddLabel(e,value.label)}>
                           <ListItemIcon>
                              <MdLabelOutline  />
                           </ListItemIcon>
                           <span>{value.label}</span>
                        </MenuItem>
                     ))
                     :
                     null
                  }

                  {
                     !unregisteredLabels.length || !userSavedLabels.length &&
                     <p>You have no saved <i>Label</i></p>
                  }


                  {
                     props.method === "multi" &&
                     <>
                        <Divider />
                        <MenuItem onClick={()  => props.setOpenDialog && props.setOpenDialog(prevState => prevState = !prevState)}>
                        <ListItemIcon>
                           <BiPlus />
                        </ListItemIcon>
                           <ListItemText>Create Label</ListItemText>
                        </MenuItem>
                     </>
                  }
               </MenuList>
            </Menu>
         </>
   )
}