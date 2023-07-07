import { FaPlus } from 'react-icons/fa'
import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Breakpoints } from '../../src/enums'

export default function CreateNewContactButton(){

   const navigate = useNavigate()
   const location = useLocation()
   const [showText,setShowText] = React.useState(window.innerWidth >= Breakpoints.Large)

   const resizeHandler = () => {
      window.innerWidth >= Breakpoints.Large ? setShowText(true) : setShowText(false)
   }

   React.useEffect(() => {
      window.addEventListener('resize',resizeHandler)

      return()=> window.removeEventListener('resize',resizeHandler)
   },[])

   return(
      !location.pathname.match("/auth") ? 
      <button
         className="cnc_btn" 
         title="Add New Contact" 
         onClick={() => navigate('/new')}
         disabled={location.pathname === "/new" || location.pathname.match('/edit') ? true : false}
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