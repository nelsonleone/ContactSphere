import { useLocation, useNavigate } from 'react-router-dom'
import HamburgerIcon from '../../lib/HamburgerIcon'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import {  MemoizedSetting as  Setting } from './UserUtils'
import NavMenu from './NavMenu'
import { HelpIcon, UserIcon } from '../../lib/with-tooltip/index'
import UserMenu from './UserMenu'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Breakpoints } from '../enums'

export interface IHeaderState {
   openUserMenu: boolean,
   toggleSettingSection: boolean,
   openHelpArea: boolean,
   openNav: boolean
}

interface IHeaderProps {
   setResizePageWidth: Dispatch<SetStateAction<boolean>>
}

export default function Header(props:IHeaderProps){

   const navigate = useNavigate()
   const location = useLocation()
   const hamburgerRef = useRef<HTMLButtonElement>(null)
   const userIconRef = useRef<HTMLButtonElement>(null)
   const [state,setState] = useState<IHeaderState>({
      openUserMenu: false,
      toggleSettingSection: false,
      openHelpArea: false,
      openNav: window.innerWidth >= Breakpoints.Large 
   })

   const handleResize = () => {
      window.innerWidth < Breakpoints.Large ?
      setState(prevState => ({ ...prevState, openNav: false })) :
      setState(prevState => ({ ...prevState, openNav: true }))
   }

   const handleClickAway = () => {
      setState(prevState => ({ ...prevState, openUserMenu: false }))
   }

   useEffect(() =>{
      // close nav menu onRouteChange
      if (window.innerWidth < Breakpoints.Large){
         setState(prevState => ({ ...prevState, openNav: false }))
      }
   },[location.pathname])

   useEffect(() => {
      window.addEventListener('resize',handleResize)
      return() => {
         window.removeEventListener('resize',handleResize)
      }
   },[])

   useEffect(() => {
      props.setResizePageWidth(state.openNav)
   },[state.openNav])


   return(
      <>
        <header className="header_main">
            <HamburgerIcon openNav={state.openNav} ref={hamburgerRef} setState={setState}  />
            <h1 onClick={() => navigate('/')}>ContactSphere</h1>

            <NavMenu openNav={state.openNav} setState={setState} />
            <SearchBar />

            <div className="user_utils">
               <HelpIcon />
               <Setting setState={setState} state={state} />
            </div>

            <ClickAwayListener
               mouseEvent="onMouseDown"
               touchEvent="onTouchStart"
               onClickAway={handleClickAway}
               >
               <div>
                  <UserIcon setState={setState} state={state} ref={userIconRef}  />
                  {
                     state.openUserMenu ?
                     <UserMenu setState={setState}  />
                     :
                     null
                  }
               </div>
            </ClickAwayListener>
         </header>
      </>
   )
}