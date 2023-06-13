import { FaPlus } from 'react-icons/fa'
import * as React from 'react'

export default function CreateNewContactButton(){
   return(
      <button className="cnc_btn" title="Add New Contact">
         <FaPlus />
         {
            window.innerWidth > 900 &&
            <span>Create Contact</span>
         }
      </button>
   )
}