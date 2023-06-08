import { useNavigate } from 'react-router-dom'
import HamburgerIcon from '../../lib/HamburgerIcon'
import { useRef, useState } from 'react'
import SearchBar from './SearchBar'
import {  MemoizedHelp as  Help, MemoizedSetting as  Setting } from './UserUtils'
import NavMenu from './NavMenu'
import { UserIcon } from '../../lib/with-tooltip/index'

export interface IHeaderState {
   openUserMenu: boolean,
   toggleSettingSection: boolean,
   openHelpArea: boolean,
   openNav: boolean
}

export default function Header(){

   const navigate = useNavigate()
   const hamburgerRef = useRef<HTMLButtonElement>(null)
   const [state,setState] = useState<IHeaderState>({
      openUserMenu: false,
      toggleSettingSection: false,
      openHelpArea: false,
      openNav: window.innerWidth > 900 
   })


   return(
      <header className="header_main">
         <HamburgerIcon openNav={state.openNav} ref={hamburgerRef} setState={setState}  />
         <h1 onClick={() => navigate('/')}>ContactSphere</h1>

         <NavMenu componentStateName='openNav' openNav={state.openNav} setState={setState} togglerRef={hamburgerRef} />
         <SearchBar />

         <div className="user_utils">
            <Help setState={setState} state={state} />
            <Setting setState={setState} state={state} />
         </div>

         <UserIcon setState={setState} state={state}  />
      </header>
   )
}