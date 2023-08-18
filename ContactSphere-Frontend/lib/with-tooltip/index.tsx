import { Dispatch, MouseEvent, Ref, SetStateAction, forwardRef } from 'react'
import { BiArrowBack, BiHelpCircle, BiTrashAlt } from 'react-icons/bi'
import { IHeaderState } from '../../src/components/Header'
import { AiFillSetting } from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaTrashRestore, FaUser } from 'react-icons/fa'
import {  FiStar } from 'react-icons/fi'
import { BiPlus } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';
import { MdNewLabel, MdOutlineCancel, MdOutlineEmail, MdUnarchive } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { useNavigate } from 'react-router-dom';
import { setShowAlert } from '../../src/RTK/features/slices/alertSlice';
import { AlertSeverity } from '../../src/enums';
import { removeSearchResult } from '../../src/RTK/features/slices/searchContactsSlice';
import { RxCross1 } from 'react-icons/rx';
import { IContactsFromDB, Sites } from '../../src/vite-env';
import SocialIconLink from './SocialIconLink'
import checkExternalLinks from '../../src/utils/helperFns/checkExternalLinks';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import stopUnauthourizedActions from '../../src/utils/helperFns/stopUnauthourizedActions';
import { setHideWrkSnackbar, setShowWrkSnackbar } from '../../src/RTK/features/slices/wrkSnackbarSlice';
import { setEdittedContact } from '../../src/RTK/features/slices/userDataSlice';
import { setShowSnackbar } from '../../src/RTK/features/slices/snackbarDisplaySlice';

interface IProps {
   setState: Dispatch<SetStateAction<IHeaderState>>,
   state: IHeaderState
}

export function HelpIcon(){

   const navigate = useNavigate()

   return(
      <div>
         <Tooltip title="See Help">
            <IconButton  
               type="button"                 
               onClick={() => navigate("/help")} 
               aria-controls="help-area"
               >
               <BiHelpCircle />
            </IconButton>
         </Tooltip>
      </div>
   )
}


export function SettingsIcon(props:IProps){

   const { beenAuthenticated } = useAppSelector(store => store.authUser)
   const dispatch = useAppDispatch()

   const handleClick = () => {
      if(!beenAuthenticated){
         dispatch(setShowAlert({
            alertMessage: "No Currently Signed In User",
            severity: AlertSeverity.ERROR
         }))
         return;
      }
      props.setState((prevState) => ({ ...prevState, toggleSettingSection: !prevState.toggleSettingSection }))
   }

   return(
      <div>
         <Tooltip title="Settings Menu">
            <IconButton
               aria-expanded={props.state.toggleSettingSection}
               type="button"
               onClick={handleClick} 
               aria-controls="setting-section" 
               aria-haspopup="dialog"
            >
               <AiFillSetting  />
            </IconButton>
         </Tooltip>
      </div>
   )
}




export function CancelButton({ handleClick,editting,isLoading }: { handleClick: () => void, editting: boolean, isLoading:boolean }){
   return(
      <Tooltip title="Cancel">
         <IconButton aria-label="cancel" type="button" disabled={isLoading || editting ? true : false} className="fx-button" onClick={handleClick}>
            <RxCross1 />
         </IconButton>
      </Tooltip>
   )
}


export function GoBackButton(){

   const navigate = useNavigate()

   return(
      <Tooltip title="Back">
         <IconButton aria-label="Back" type="button" className="back-button" onClick={() => navigate(-1)}>
            <BiArrowBack />
         </IconButton>
      </Tooltip>
   )
}


export function EmailLinkButton({ mailTo }: { mailTo:string }){

   return(
      mailTo ? 
      <Tooltip title="Email">
         <a href={mailTo} className="active_net_link">
            <MdOutlineEmail aria-describedby="contact-email-icon-desc" />
            <span className="AT_only" id="contact-email-icon-desc">Send Email To Contact</span>
         </a>
      </Tooltip>
      :
      <button disabled={true}>
         <MdOutlineEmail aria-describedby="contact-email-icon-desc" />
         <span className="AT_only" id="contact-email-icon-desc">No Email For This Contact</span>
      </button>
   )
}


export function SocialSiteLink({ site, handle }: { site:Sites, handle:string }){
   
   const contactSocialSiteHandle = checkExternalLinks(handle)

   return(
      handle ?
      <Tooltip title={`View ${site} page`}>
         <a href={contactSocialSiteHandle} className={handle ? "active_net_link" : ""}>
            <SocialIconLink site={site} />
         </a>
      </Tooltip>
      :
      <button disabled={true}>
         <SocialIconLink site={site} />
      </button>
   )
}







export function ManageLabelButton({ className, penMode, handleClick, disabled }:{ disabled:boolean,penMode:boolean, className:string, handleClick: () => void}){
   return(
      <Tooltip title="Manage Labels">
         <button className={className} type="button" disabled={disabled} aria-label="Choose Label For This Contact" onClick={handleClick}>
            {
               !penMode ?
               <>
                  <BiPlus aria-label="add" />
                  <span>Labels</span>
               </>
               :
               <MdNewLabel style={{fontSize:'1.9rem',color:'#097f83'}} />
            }
         </button>
      </Tooltip>
   )
}




// Contact Item Action Buttons With ToolTip
interface IStarButtonProps {
   inFavourites: boolean,
   addToFavourites: MutationTrigger<MutationDefinition<{
      contactId: string;
      authUserUid: string;
      status: boolean;
   }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "Contact" | "Label", IContactsFromDB, "contactsQueryApi">> ,
   _id: string,
   phoneNumber: string,
   starred: boolean
}

export function StarIconButton(props:IStarButtonProps){

   const { inFavourites, addToFavourites, _id, phoneNumber, starred } = props;
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const dispatch = useAppDispatch()

   const handleStarring = async(e:MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      try{
         dispatch(setShowWrkSnackbar())
         await stopUnauthourizedActions(uid)
         // Status Is Used To Update The Interacted Contact [updates "inFavourites" to false if true and vice-versa]
         const status = inFavourites ? false : true;
         const interactedContact = await addToFavourites({contactId:_id,authUserUid:uid!,status}).unwrap()

         if(!interactedContact){
            throw new Error("An Error Occured Starring Contact, Try Again")
         }

         dispatch(setEdittedContact(interactedContact))
         
         dispatch(setShowSnackbar({
            // inFavourites Is Still In Previous State Due to Function Still Running
            snackbarMessage: inFavourites  ? `Star removed from ${phoneNumber}` : `${phoneNumber} have been  Starred`,
         }))
      }

      catch(err:any|unknown){
         dispatch(setShowAlert({
            alertMessage: err.message || "Error Interacting With Contact, Try Again" ,
            severity: AlertSeverity.ERROR
         }))
      }

      finally{
         dispatch(setHideWrkSnackbar())
      }
   }

   return(
      <Tooltip title="Star Contact">
         <IconButton className="contact_star_button" type="button" onClick={handleStarring}>
            <FiStar aria-label="star" fill={starred ? "#09c9e2" : "white"} color={starred ? "#09c9e2" : "hsl(0, 3%, 16%) " } />
         </IconButton>
      </Tooltip>
   )
}


export function EditIconButton({navigateTo,toolTipText, action}:{ toolTipText?:string, navigateTo?:string, action?: () => void }){
   const navigate = useNavigate()

   const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if(navigateTo){
         navigate(navigateTo)
      }
      
      if(action){
         action()
      }
   }

   return(
      <Tooltip title={toolTipText || "Edit Contact"}>
         <IconButton className="contact_edit_button" type="button" onClick={handleClick}>
            <GoPencil aria-label="edit" color=" hsl(0, 3%, 16%)"  />
         </IconButton>
      </Tooltip>
   )
}



export function DeleteIconButton({handleDelete,toolTipText}:{ toolTipText?:string, handleDelete:() => void}){
   return(
      <Tooltip title={toolTipText || "Delete"}>
         <IconButton onClick={handleDelete}>
            <BiTrashAlt aria-label="Delete"  />
         </IconButton>
      </Tooltip>
   )
}


export function RestoreToActiveButton({handleRestore}:{ handleRestore:() => void}){

   const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      handleRestore()
   }

   return(
      <Tooltip title="Unarchive">
         <button className="contact_unarchive_button" type="button" onClick={handleClick}>
            <MdUnarchive aria-label="unarchive" style={{fontSize: '1.4rem'}} />
         </button>
      </Tooltip>
   )
}


export function RestoreFromTrashButton({handleRestore}:{ handleRestore:() => void}){

   const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      handleRestore()
   }

   return(
      <Tooltip title="Restore contact">
         <IconButton className="contact_unarchive_button" type="button" onClick={handleClick}>
            <FaTrashRestore aria-label="Restore" />
         </IconButton>
      </Tooltip>
   )
}


interface IContactMenuProps {
   openContactMenu?:(e:MouseEvent<HTMLButtonElement>) => void,
   tooltipText: string,
   color?: string,
   ariaControls: string,
   ariaExpanded: boolean
}

export function ContactMenuButton(props:IContactMenuProps){

   const {
      openContactMenu,
      tooltipText,
      color,
      ariaControls,
      ariaExpanded
   } = props;

   const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      
      if(openContactMenu){
         openContactMenu(e)
      }
   }

   return(
      <Tooltip title={tooltipText || "Contact Menu"}>
         <IconButton 
            aria-controls={ariaControls || ''} 
            aria-expanded={ariaExpanded ? "true" : "false"} 
            aria-haspopup="menu" 
            className="contact_menu_button" 
            type="button" 
            onClick={handleClick}>
            <BsThreeDotsVertical aria-label="menu" color={color || " hsl(0, 3%, 16%)"}  />
         </IconButton>
      </Tooltip>
   )
} 
//



export function SearchbarCancelSearchIcon({setSearchValue}:{ setSearchValue: Dispatch<SetStateAction<string>>}){

   const dispatch = useAppDispatch()
   const handleClick = () => {
      dispatch(removeSearchResult())
      setSearchValue("")
   }

   return(
      <Tooltip title="Clear Search">
         <IconButton 
            aria-controls="search-bar" 
            aria-label="clear"
            type="button" 
            onClick={handleClick}>
            <MdOutlineCancel />
         </IconButton>
      </Tooltip>
   )
}



function UserIcon(props:IProps,ref:Ref<HTMLButtonElement>){

   const { beenAuthenticated } = useAppSelector(store => store.authUser)
   const dispatch = useAppDispatch()

   const handleClick = () => {
      if(!beenAuthenticated){
         dispatch(setShowAlert({
            alertMessage: "No Currently Signed In User",
            severity: AlertSeverity.ERROR
         }))

         return;
      }
      props.setState(prevState => ({ ...prevState,openUserMenu:!prevState.openUserMenu }))
   }

   return(
      <Tooltip title="User Menu">
        <button
            ref={ref}
            type="button"
            className='toggle-user-menu' 
            aria-controls='user-menu' 
            aria-expanded={props.state.openUserMenu ? "true" : "false"}
            aria-haspopup="true"
            onClick={handleClick}
            >
            <span className="AT_only">User Menu</span>
            <FaUser aria-hidden="true" />
         </button>
      </Tooltip>
   )
}

const UserIconWithRef = forwardRef(UserIcon)
export {UserIconWithRef as UserIcon} 