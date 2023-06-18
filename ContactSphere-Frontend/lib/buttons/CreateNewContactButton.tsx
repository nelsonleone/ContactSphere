import { FaPlus } from 'react-icons/fa'
import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function CreateNewContactButton(){

   const navigate = useNavigate()
   const location = useLocation()
   const [showText,setShowText] = React.useState(window.innerWidth > 960)

   const resizeHandler = () => {
      window.innerWidth > 960 ? setShowText(true) : setShowText(false)
   }

   React.useEffect(() => {
      window.addEventListener('resize',resizeHandler)

      return()=> window.removeEventListener('resize',resizeHandler)
   },[])

   return(
      !location.pathname.match("/auth") && location.pathname !== "/new" ? 
      <button className="cnc_btn" title="Add New Contact" onClick={() => navigate('/new')}>
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