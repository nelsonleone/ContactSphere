import { FaPlus } from 'react-icons/fa'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateNewContactButton(){

   const navigate = useNavigate()

   return(
      <button className="cnc_btn" title="Add New Contact" onClick={() => navigate('/new')}>
         <FaPlus />
         {
            window.innerWidth > 900 &&
            <span>Create Contact</span>
         }
      </button>
   )
}