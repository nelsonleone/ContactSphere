import { useLocation, useNavigate } from 'react-router-dom'
import HamburgerIcon from '../../lib/HamburgerIcon'
import { useRef, useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { FaUser } from 'react-icons/fa'
import {  MemoizedHelp as  Help, MemoizedSetting as  Setting } from './UserUtils'
import NavMenu from './NavMenu'

export interface IHeaderState {
   openUserMenu: boolean,
   toggleSettingSection: boolean,
   openHelpArea: boolean,
   openNav: boolean
}

export default function Header(){

   const navigate = useNavigate()
   const hamburgerRef = useRef<HTMLButtonElement>(null)
   const location = useLocation()
   const [state,setState] = useState<IHeaderState>({
      openUserMenu: false,
      toggleSettingSection: false,
      openHelpArea: false,
      openNav: window.innerWidth > 900 
   })

   useEffect(() => {
      // hide main nav contents in auth locations
      if(location.pathname === '/auth/signin' ||  location.pathname ==='/auth/create_account'){
         setState(prevState => ({ ...prevState, openNav: false }))
         hamburgerRef.current?.disabled === false ? true : true
      }
   },[])


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
         
        <button 
           className='toggle-user-menu' 
           aria-controls='user-menu' 
           aria-expanded={state.openUserMenu}
           onClick={() => setState(prevState => ({...prevState, openUserMenu: !prevState.openUserMenu}))}
           >
           <FaUser />
        </button>
      </header>
   )
}