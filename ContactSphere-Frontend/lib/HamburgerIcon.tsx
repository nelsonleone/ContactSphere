import { Divide as Hamburger } from 'hamburger-react'
import React from 'react'
import { useState } from 'react'

export default function HamburgerIcon(){

   const [isOpen, setIsOpen] = useState<boolean>(false)

   return(
      <button 
         onClick={() => setIsOpen((prevState) => prevState = !prevState)} 
         aria-controls='main-nav' 
         aria-expanded={isOpen}
         aria-label='Open Navigation Menu'
         className="hamburger-icon"
        >
         <span className='AT_only'>Menu</span>
         <Hamburger toggled={isOpen} size={25} />
      </button>
   )
}