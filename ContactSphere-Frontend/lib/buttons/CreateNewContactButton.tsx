import { FaPlus } from 'react-icons/fa'
import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Breakpoints } from '../../src/enums'
import { useAppSelector } from '../../src/customHooks/reduxCustomHooks'

export default function CreateNewContactButton(){

   const navigate = useNavigate()
   const location = useLocation()
   const { beenAuthenticated } = useAppSelector(store => store.authUser)
   const { openNav } = useAppSelector(store => store.openNav)
   const [isDisabled,setIsDisabled] = React.useState(
      !location.pathname.match("/auth") &&
      location.pathname !== "/new" && 
      !location.pathname.match('/edit') &&
      beenAuthenticated ? false : true
   )
   const [showText,setShowText] = React.useState(window.innerWidth >= Breakpoints.Large)

   const resizeHandler = () => {
      window.innerWidth >= Breakpoints.Large ? setShowText(true) : setShowText(false)
   }

   React.useEffect(() => {
      window.addEventListener('resize',resizeHandler)

      return()=> window.removeEventListener('resize',resizeHandler)
   },[])

   React.useEffect(() => {
      setIsDisabled(
         location.pathname !== "/new" && 
         !location.pathname.match('/edit') &&
         beenAuthenticated ? false : true
      )
   },[beenAuthenticated,location.pathname])


   return(
      !location.pathname.match("/auth") &&
      !location.pathname.match('/c')  ?
      <button
         className={!openNav ? "cnc_btn cnc_btn_hide" : "cnc_btn"} 
         title={isDisabled ? undefined : "Create New Contact"}
         onClick={() => isDisabled ? {} : navigate("/new")}
         disabled={isDisabled}
         >
         <FaPlus />
         {
            showText  &&
            <span>Create Contact</span>
         }
      </button>
      :
      null
   )
}