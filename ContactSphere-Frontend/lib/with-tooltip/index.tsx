import { Dispatch, SetStateAction } from 'react'
import { BiHelpCircle } from 'react-icons/bi'
import { IHeaderState } from '../../src/components/Header'
import { AiFillSetting } from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaUser } from 'react-icons/fa'

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


export function UserIcon(props:IProps){
   return(
      <Tooltip title="User Menu">
        <button
            className='toggle-user-menu' 
            aria-controls='user-menu' 
            aria-expanded={props.state.openUserMenu}
            onClick={() => setState(prevState => ({...prevState, openUserMenu: !prevState.openUserMenu}))}
            >
            <FaUser />
         </button>
      </Tooltip>
   )
}