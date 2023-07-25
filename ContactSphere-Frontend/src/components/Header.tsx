import { useLocation, useNavigate } from 'react-router-dom'
import HamburgerIcon from '../../lib/HamburgerIcon'
import { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import {  MemoizedSetting as  Setting } from './UserUtils'
import { HelpIcon, UserIcon } from '../../lib/with-tooltip/index'
import UserMenu from './UserMenu'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Breakpoints } from '../enums'
import { setOpenNav } from '../RTK/features/openNavMenuSlice'
import { useAppDispatch } from '../customHooks/reduxCustomHooks'

export interface IHeaderState {
   openUserMenu: boolean,
   toggleSettingSection: boolean,
   openHelpArea: boolean
}

export default function Header(){

   const navigate = useNavigate()
   const location = useLocation()
   const userIconRef = useRef<HTMLButtonElement>(null)
   const dispatch = useAppDispatch()
   const [state,setState] = useState<IHeaderState>({
      openUserMenu: false,
      toggleSettingSection: false,
      openHelpArea: false,
   })

   const handleResize = () => {
      window.innerWidth < Breakpoints.Large ?
      dispatch(setOpenNav(false)) :
      dispatch(setOpenNav(true))
   }

   const handleClickAway = () => {
      setState(prevState => ({ ...prevState, openUserMenu: false }))
   }

   useEffect(() =>{
      // close nav menu onRouteChange
      if (window.innerWidth < Breakpoints.Large){
         dispatch(setOpenNav(false))
      }
   },[location.pathname])

   useEffect(() => {
      window.addEventListener('resize',handleResize)
      return() => {
         window.removeEventListener('resize',handleResize)
      }
   },[])


   return(
      <header>
        <div className="header_main">
            <HamburgerIcon />
            <h1 onClick={() => navigate('/')}>ContactSphere</h1>
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
         </div>
      </header>
   )
}