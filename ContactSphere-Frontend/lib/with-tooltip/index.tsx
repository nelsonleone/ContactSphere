import { Dispatch, Ref, SetStateAction, forwardRef } from 'react'
import { BiHelpCircle } from 'react-icons/bi'
import { IHeaderState } from '../../src/components/Header'
import { AiFillSetting } from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {  FaUser } from 'react-icons/fa'
import { BiPlus } from 'react-icons/bi';
import { MdNewLabel } from 'react-icons/md';
import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'


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
            <IconButton
               aria-expanded={props.state.toggleSettingSection}
               type="button"
               onClick={() => props.setState((prevState) => ({ ...prevState, toggleSettingSection: !prevState.toggleSettingSection }))} 
               disabled={beenAuthenticated  ? false : true}
               aria-controls="setting-section" 
              >
               <AiFillSetting  />
            </IconButton>
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
               <MdNewLabel />
            }
         </button>
      </Tooltip>
   )
}



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