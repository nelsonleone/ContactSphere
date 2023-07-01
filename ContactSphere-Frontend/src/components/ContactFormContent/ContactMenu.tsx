import { BiArchiveIn } from 'react-icons/bi'
import { BsTrash3Fill } from 'react-icons/bs'
import { MdLabelOutline } from 'react-icons/md'
import { useAppSelector, useAppDispatch } from '../../customHooks/reduxCustomHooks';
import { ContactMenuButton } from '../../../lib/with-tooltip';
import { MouseEvent, useEffect, useState } from 'react';
import { useManageLabelsMutation } from '../../RTK/features/injectedContactsApiQueries';
import { AlertSeverity } from '../../enums';
import { setShowAlert } from '../../RTK/features/alertSlice';
import { setHideWrkSnackbar, setShowWrkSnackbar } from '../../RTK/features/wrkSnackbarSlice';
import { setShowSnackbar } from '../../RTK/features/snackbarDisplaySlice';
import { Divider, Menu, MenuItem } from '@mui/material';
import { ListItemIcon, ListItemText, MenuList } from '@mui/material';

interface IProps {
   contactLabels?: {
      label: string
   }[],
   contactId?: string
}

export default function ContactMenu(props:IProps){

   const { labels:userSavedLabels } = useAppSelector(store => store.userData)
   const uid = useAppSelector(store =>  store.authUser.userDetails.uid)
   const [manageLabels] = useManageLabelsMutation()
   const dispatch = useAppDispatch()

   const handleAddLabel = async(e:React.MouseEvent<{}>,label:string) => {
      e.stopPropagation()
      setAnchorEl(null)
      dispatch(setShowWrkSnackbar())

      // Contact Menu Used In Individual Contacts
      if(props.contactId){
         try{
            if(!uid){
               throw new Error("Unauthourized request, please login")
            }
      
            await manageLabels({
               authUserUid: uid,
               label,
               contactId:props.contactId,
               actionType: "add"
            })
   
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

      // Handle Multi Select
      else{

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
   useEffect(() => {
      setUnregisteredLabels(userSavedLabels.filter(item => props.contactLabels?.some(obj => obj.label === item.label)))
   },[props.contactLabels?.length,userSavedLabels?.length])

   return(
         <>
            <ContactMenuButton ariaExpanded={open} ariaControls="contact-menu" tooltipText='Contact Menu' openContactMenu={(e) => handleClick(e)} />
            <Menu 
              className="contact_menu"
              id="contact-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              >
               <MenuList>
                  <MenuItem>
                     <ListItemIcon>
                        <BiArchiveIn />
                     </ListItemIcon>
                     <ListItemText>Hide Contact</ListItemText>
                  </MenuItem>
                  <MenuItem>
                     <ListItemIcon>
                        <BsTrash3Fill />
                     </ListItemIcon>
                  <ListItemText>Delete Contact</ListItemText>
                  </MenuItem>
                  <Divider />
                  {
                     unregisteredLabels.length ? unregisteredLabels.map(value => (
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
               </MenuList>
            </Menu>
         </>
   )
}