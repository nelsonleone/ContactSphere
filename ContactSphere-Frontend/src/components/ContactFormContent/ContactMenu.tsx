import { BiArchiveIn, BiPlus } from 'react-icons/bi'
import { BsTrash3Fill } from 'react-icons/bs'
import { MdLabelOutline } from 'react-icons/md'
import { useAppSelector, useAppDispatch } from '../../customHooks/reduxCustomHooks';
import { useState } from 'react'
import { ContactMenuButton } from '../../../lib/with-tooltip';
import { MouseEvent, SetStateAction, Dispatch, memo } from 'react';
import { useTrashContactMutation, useSendMultipleToTrashMutation, useHideContactMutation, useHideMultipleContactsMutation, useManageLabelsMutation, useManageMultiContactLabelsMutation } from '../../RTK/features/api/injectedContactsApiQueries';
import { Divider, Menu, MenuItem } from '@mui/material';
import { ListItemIcon, ListItemText, MenuList } from '@mui/material';
import stopUnauthourizedActions from '../../utils/helperFns/stopUnauthourizedActions';
import handleAsyncHideContact from '../../utils/helperFns/handleAsyncHideContact';
import handleAsyncDelete from '../../utils/helperFns/handleAsyncDelete';
import clientAsyncHandler from '../../utils/helperFns/clientAsyncHandler';
import handleAsyncAddLabel from '../../utils/helperFns/handleAsyncAddLabel';
import CustomCheckbox from '../../../lib/customInputs/CustomCheckbox';
import CustomSimpleDialog from '../../../lib/popups/CustomSimpleDialog'

interface IProps {
   contactLabels?: {
      label: string
   }[],
   contactId?: string,
   phoneNumber?: string
   method: "single" | "multi",
   id?: string,
   ariaLabelledBy?: string,
   setOpenDialog?: Dispatch<SetStateAction<boolean>>
}

function ContactMenu(props:IProps){

   const { labels:userSavedLabels, contacts } = useAppSelector(store => store.userData)
   const uid = useAppSelector(store =>  store.authUser.userDetails.uid)
   const [manageLabels] = useManageLabelsMutation()
   const dispatch = useAppDispatch()
   const { selectedContacts } = useAppSelector(store => store.multiSelect)
   const [manageMultiContactsLabels] = useManageMultiContactLabelsMutation()
   const [sendToTrash] = useTrashContactMutation()
   const [sendMultipleToTrash] = useSendMultipleToTrashMutation()
   const [hideContact] = useHideContactMutation()
   const [hideMultipleContacts] = useHideMultipleContactsMutation()
   const [showDialog,setShowDialog] = useState(false)
   const unregisteredLabels = userSavedLabels?.filter(item => !props.contactLabels?.some(obj => obj.label === item.label))

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
     setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
     setAnchorEl(null)
   }

   const handleAddLabel = async(e:React.MouseEvent<{}>,label:string,action:"add"|"remove") => {
      e.stopPropagation()
      setAnchorEl(null)
      handleClose()

      clientAsyncHandler(async() => {
         await stopUnauthourizedActions(uid)
         await handleAsyncAddLabel(
            dispatch,
            action,
            props.contactId || '',
            uid!,
            props.method,
            selectedContacts,
            label,
            props.phoneNumber || '',
            manageLabels,
            manageMultiContactsLabels,
         )
      },dispatch)
   }

   const handleMenuHideContact = (e:MouseEvent<HTMLLIElement>) => {
      e.stopPropagation()
      clientAsyncHandler(
         async() => {
            handleClose()
            await stopUnauthourizedActions(uid)
            await handleAsyncHideContact(
               dispatch,
               props.method,
               props.contactId || '',
               true,
               uid!,
               selectedContacts,
               contacts,
               hideContact,
               hideMultipleContacts
            )
         },
         dispatch
      )
   }



   const handleMenuDeleteContact = () => clientAsyncHandler(
      async () => {      
         handleClose()
         setShowDialog(false)
         await stopUnauthourizedActions(uid)
         await handleAsyncDelete(
            sendToTrash,
            sendMultipleToTrash,
            props.method,
            uid!,
            props.contactId || '',
            selectedContacts,
            dispatch,
            contacts
         )
      },
      dispatch
   )

   const handleCreateBtnClick = () => {
      props.setOpenDialog && props.setOpenDialog(prevState => prevState = !prevState)
   }

   const handleMenuDeleteButtonClick = (e:MouseEvent<HTMLLIElement>) => {
      e.stopPropagation()
      setShowDialog(prevState => prevState = !prevState)
   }

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
               <MenuItem onClick={handleMenuDeleteButtonClick}>
                  <ListItemIcon>
                     <BsTrash3Fill />
                  </ListItemIcon>
               <ListItemText>Delete</ListItemText>
               </MenuItem>
               {
                  props.method === "single" && userSavedLabels?.length || 
                  props.method === "multi" && userSavedLabels?.length ?
                  <div>
                     <Divider />
                     <span className="menu-item-label">Manage Labels</span>
                  </div>
                  : 
                  null
               }
               
               {
                  props.method === "single" && userSavedLabels.length ? userSavedLabels.map(value =>  {
                     return(
                        !props.contactLabels?.some(obj => obj.label === value.label) ?
                        <MenuItem className="label flex-row" key={value._id} onClick={(e) => handleAddLabel(e,value.label,"add")}>
                           <ListItemIcon>
                              <MdLabelOutline  />
                           </ListItemIcon>
                           <span>{value.label}</span>
                           <CustomCheckbox 
                              color="hsl(182, 87%, 27%)" 
                              checked={false} 
                              handleCheck={() => {}}
                              disabled={true}
                              size="small" 
                           />
                        </MenuItem>
                        :
                        <MenuItem className="label flex-row" key={value._id} onClick={(e) => handleAddLabel(e,value.label,"remove")}>
                           <ListItemIcon>
                              <MdLabelOutline  />
                           </ListItemIcon>
                           <span>{value.label}</span>
                           <CustomCheckbox 
                              color="hsl(182, 87%, 27%)" 
                              checked={true} 
                              handleCheck={() => {}}
                              disabled={true}
                              size="small" 
                           />
                        </MenuItem>
                     )
                  })
                  :
                  // Regardless of the ActionType Parametrr, If Label Already exists In A Contacts LabelledBy, It won't Be Added Again
                  props.method === "multi" && userSavedLabels?.length ? userSavedLabels.map(value => (
                     <MenuItem className="label flex-row" key={value._id} onClick={(e) => handleAddLabel(e,value.label,"add")}>
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
                  <div>
                     <Divider />
                     <MenuItem onClick={handleCreateBtnClick}>
                        <ListItemIcon>
                           <BiPlus />
                        </ListItemIcon>
                        <ListItemText>Create Label</ListItemText>
                     </MenuItem>
                  </div>
               }
            </MenuList>
         </Menu>

         <CustomSimpleDialog 
            dialogTitle="Delete From Contacts?" 
            dialogText="This contact will be permanently deleted from this account after 30 days." 
            open={showDialog} 
            setOpen={setShowDialog} 
            action={handleMenuDeleteContact}
            btnText1="Cancel"
            btnText2="Move To Trash"
         />
      </>
   )
}

export default memo(ContactMenu)