import { Dispatch, Ref, SetStateAction, forwardRef } from 'react'
import { BiHelpCircle } from 'react-icons/bi'
import { IHeaderState } from '../../src/components/Header'
import { AiFillSetting } from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaUser } from 'react-icons/fa'
import { BiPlus } from 'react-icons/bi';


interface IProps {
   setState: Dispatch<SetStateAction<IHeaderState>>,
   state: IHeaderState
}

export function HelpIcon(props:IProps){
   return(
      <div>
         <Tooltip title="Help Menu">
            <IconButton                   
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
   return(
      <div>
         <Tooltip title="Settings Menu">
            <IconButton
               aria-expanded={props.state.toggleSettingSection}
               onClick={() => props.setState((prevState) => ({ ...prevState, toggleSettingSection: !prevState.toggleSettingSection }))} 
               aria-controls="setting-section" 
              >
               <AiFillSetting  />
            </IconButton>
         </Tooltip>
      </div>
   )
}




export function ManageLabelButton({ className }:{className:string}){
   return(
      <Tooltip title="Manage Labels">
         <button className={className} type="button" aria-label="Choose Label For This Contact">
               <BiPlus />
               <span>Labels</span>
         </button>
      </Tooltip>
   )
}



function UserIcon(props:IProps,ref:Ref<HTMLButtonElement>){
   return(
      <Tooltip title="User Menu">
        <button
            ref={ref}
            className='toggle-user-menu' 
            aria-controls='user-menu' 
            aria-expanded={props.state.openUserMenu}
            onClick={() => props.setState(prevState => ({...prevState, openUserMenu: !prevState.openUserMenu}))}
            >
            <FaUser />
         </button>
      </Tooltip>
   )
}

const UserIconWithRef = forwardRef(UserIcon)
export {UserIconWithRef as UserIcon} 