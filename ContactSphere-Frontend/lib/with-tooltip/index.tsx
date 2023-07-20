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
import { MdNewLabel, MdUnarchive } from 'react-icons/md';
import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { useNavigate } from 'react-router-dom';


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

   return(
      <div>
         <Tooltip title="Settings Menu">
            {
               beenAuthenticated ?
               <IconButton
                  aria-expanded={props.state.toggleSettingSection}
                  type="button"
                  onClick={() => props.setState((prevState) => ({ ...prevState, toggleSettingSection: !prevState.toggleSettingSection }))} 
                  aria-controls="setting-section" 
               >
                  <AiFillSetting  />
               </IconButton>
               :
               <IconButton>
                  <AiFillSetting style={{cursor:"not-allowed"}} />
               </IconButton>
            }
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
                  <BiPlus />
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
         <button className="contact_star_button" type="button" onClick={handleStarring}>
            <FiStar fill={starred ? "#09c9e2" : "white"} color={starred ? "#09c9e2" : "hsl(0, 3%, 16%) " } />
         </button>
      </Tooltip>
   )
}


export function EditIconButton({navigateToEditPage,toolTipText}:{ toolTipText?:string, navigateToEditPage:() => void}){
   return(
      <Tooltip title={toolTipText || "Edit Contact"}>
         <button className="contact_edit_button" type="button" onClick={navigateToEditPage}>
            <GoPencil color=" hsl(0, 3%, 16%)"  />
         </button>
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
         <button className="contact_unarchive_button" type="button" onClick={handleRestore}>
            <FaTrashRestore aria-label="Restore" />
         </button>
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
         <button 
            aria-controls={ariaControls || ''} 
            aria-expanded={ariaExpanded ? "true" : "false"} 
            aria-haspopup="menu" 
            className="contact_menu_button" 
            type="button" 
            onClick={openContactMenu}>
            <BsThreeDotsVertical color={color || " hsl(0, 3%, 16%)"}  />
         </button>
      </Tooltip>
   )
} 
//



function UserIcon(props:IProps,ref:Ref<HTMLButtonElement>){

   return(
      <Tooltip title="User Menu">
        <button
            ref={ref}
            type="button"
            className='toggle-user-menu' 
            aria-controls='user-menu' 
            aria-expanded={props.state.openUserMenu ? "true" : "false"}
            aria-haspopup="true"
            onClick={() => props.setState(prevState => ({ ...prevState,openUserMenu:!prevState.openUserMenu }))}
            >
            <FaUser />
         </button>
      </Tooltip>
   )
}

const UserIconWithRef = forwardRef(UserIcon)
export {UserIconWithRef as UserIcon} 