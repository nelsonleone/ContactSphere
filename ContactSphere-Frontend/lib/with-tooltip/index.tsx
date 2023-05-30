import { Dispatch, SetStateAction } from 'react'
import { BiHelpCircle } from 'react-icons/bi'
import React from 'react'
import { IHeaderState } from '../../src/components/Header'
import { AiFillSetting } from 'react-icons/ai'

interface IProps {
   setState: Dispatch<SetStateAction<IHeaderState>>,
   state: IHeaderState
}

export function HelpIcon(props:IProps){
   return(
      <div>
         <BiHelpCircle
            onClick={() => props.setState((prevState) => ({ ...prevState, openHelpArea: !prevState.openHelpArea }))} 
            aria-controls="help-area"
            aria-expanded={props.state.openHelpArea}
            aria-describedby="help-icon-tooltip"
         />
         <span id="help-icon-tooltip" role="tooltip">Help Menu</span>
      </div>
   )
}


export function SettingsIcon(props:IProps){
   return(
      <div>
         <AiFillSetting 
            aria-expanded={props.state.toggleSettingSection}
            onClick={() => props.setState((prevState) => ({ ...prevState, toggleSettingSection: !prevState.toggleSettingSection }))} 
            aria-controls="setting-section" 
            aria-describedby="settings-icon-tooltip"
         />
         <span id="settings-icon-tooltip" role="tooltip">Settings Menu</span>
      </div>
   )
}