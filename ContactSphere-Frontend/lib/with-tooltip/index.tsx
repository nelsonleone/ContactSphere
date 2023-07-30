import { Dispatch, MouseEvent, Ref, SetStateAction, forwardRef } from 'react'
import { BiHelpCircle, BiTrashAlt } from 'react-icons/bi'
import { IHeaderState } from '../../src/components/Header'
import { AiFillSetting } from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {  FaTrashRestore, FaUser } from 'react-icons/fa'
import {  FiStar } from 'react-icons/fi'
import { BiPlus } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';
import { MdNewLabel, MdOutlineCancel, MdUnarchive } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { useNavigate } from 'react-router-dom';
import { setShowAlert } from '../../src/RTK/features/slices/alertSlice';
import { AlertSeverity } from '../../src/enums';
import { removeSearchResult } from '../../src/RTK/features/searchContactsSlice';


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

export function StarIconButton({starred,handleStarring}: { starred:boolean,handleStarring:() => void }){
   return(
      <Tooltip title="Star Contact">
         <IconButton className="contact_star_button" type="button" onClick={handleStarring}>
            <FiStar aria-label="star" fill={starred ? "#09c9e2" : "white"} color={starred ? "#09c9e2" : "hsl(0, 3%, 16%) " } />
         </IconButton>
      </Tooltip>
   )
}


export function EditIconButton({navigateToEditPage,toolTipText}:{ toolTipText?:string, navigateToEditPage:() => void}){
   return(
      <Tooltip title={toolTipText || "Edit Contact"}>
         <IconButton className="contact_edit_button" type="button" onClick={navigateToEditPage}>
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
   return(
      <Tooltip title="Unarchive">
         <button className="contact_unarchive_button" type="button" onClick={handleRestore}>
            <MdUnarchive aria-label="unarchive" style={{fontSize: '1.4rem'}} />
         </button>
      </Tooltip>
   )
}


export function RestoreFromTrashButton({handleRestore}:{ handleRestore:() => void}){
   return(
      <Tooltip title="Restore contact">
         <IconButton className="contact_unarchive_button" type="button" onClick={handleRestore}>
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

   return(
      <Tooltip title={tooltipText || "Contact Menu"}>
         <IconButton 
            aria-controls={ariaControls || ''} 
            aria-expanded={ariaExpanded ? "true" : "false"} 
            aria-haspopup="menu" 
            className="contact_menu_button" 
            type="button" 
            onClick={openContactMenu}>
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