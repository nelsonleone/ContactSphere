import { useLocation, useNavigate } from 'react-router-dom'
import HamburgerIcon from '../../lib/HamburgerIcon'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import {  MemoizedHelp as  Help, MemoizedSetting as  Setting } from './UserUtils'
import NavMenu from './NavMenu'
import { UserIcon } from '../../lib/with-tooltip/index'
import UserMenu from './UserMenu'

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
   const [innerWidth,setInnerWidth] = useState<number>(window.innerWidth)
   const [state,setState] = useState<IHeaderState>({
      openUserMenu: false,
      toggleSettingSection: false,
      openHelpArea: false,
      openNav: window.innerWidth > 960 
   })

   const handleResize = () => {
      setInnerWidth(window.innerWidth)
      window.innerWidth < 960 ?
      setState(prevState => ({ ...prevState, openNav: false })) :
      setState(prevState => ({ ...prevState, openNav: true }))
   }

   useEffect(() =>{
      // close nav menu onRouteChange
      if (window.innerWidth < 960){
         setState(prevState => ({ ...prevState, openNav: false }))
      }
   },[location.pathname])

   useEffect(() => {
      setInnerWidth(window.innerWidth)
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

            <NavMenu 
               componentStateName='openNav' 
               openNav={state.openNav} 
               setState={setState} 
               togglerRef={hamburgerRef}
               stop={innerWidth > 960}
            />
            <SearchBar />

            <div className="user_utils">
               <Help setState={setState} state={state} />
               <Setting setState={setState} state={state} />
            </div>

            <UserIcon setState={setState} state={state} ref={userIconRef}  />
         </header>
         {
            state.openUserMenu ?
            <UserMenu componentStateName='openUserMenu' openUserMenu={state.openUserMenu} setState={setState} togglerRef={userIconRef} />
            :
            null
         }
      </>
   )
}