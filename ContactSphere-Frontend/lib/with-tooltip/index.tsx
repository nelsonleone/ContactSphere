import { Dispatch, MouseEvent, Ref, SetStateAction, forwardRef } from 'react'
import { BiHelpCircle } from 'react-icons/bi'
import { IHeaderState } from '../../src/components/Header'
import { AiFillSetting } from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {  FaUser } from 'react-icons/fa'
import {  FiStar } from 'react-icons/fi'
import { BiPlus } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoPencil } from 'react-icons/go';
import { MdNewLabel } from 'react-icons/md';
import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'
import { MdLabelOutline } from 'react-icons/md'


interface IProps {
   setState: Dispatch<SetStateAction<IHeaderState>>,
   state: IHeaderState
}

export function HelpIcon(props:IProps){
   return(
      <div>
         <Tooltip title="Help Menu">
            <IconButton  
               type="button"                 
               onClick={() => props.setState((prevState) => ({ ...prevState, openHelpArea: !prevState.openHelpArea }))} 
               aria-controls="help-area"
               aria-expanded={props.state.openHelpArea}
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




export function ManageLabelButton({ className, penMode, handleClick }:{ penMode:boolean, className:string, handleClick: () => void}){
   return(
      <Tooltip title="Manage Labels">
         <button className={className} type="button" aria-label="Choose Label For This Contact" onClick={handleClick}>
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
            <FiStar color={starred ? "#d4c006" : " hsl(0, 3%, 16%)"}  />
         </button>
      </Tooltip>
   )
}


export function EditIconButton({navigateToEditPage}:{ navigateToEditPage:() => void}){
   return(
      <Tooltip title="Edit Contact">
         <button className="contact_edit_button" type="button" onClick={navigateToEditPage}>
            <GoPencil color=" hsl(0, 3%, 16%)"  />
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

export function ContactManageLabelsButton({handleClick}:{handleClick: () => void}){
   return(
      <Tooltip title="Manage Labels">
         <button className="contact_mulitselect_manage_labels_button" type="button" onClick={handleClick}>
            <MdLabelOutline  />
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