import { Divide as Hamburger } from 'hamburger-react'
import React, { Dispatch, Ref, SetStateAction, forwardRef, useEffect } from 'react'
import { useState } from 'react'
import { IHeaderState } from '../src/components/Header'

interface IProps{
   setState: Dispatch<SetStateAction<IHeaderState>>,
   openNav: boolean
}

function HamburgerIcon(props:IProps,ref:Ref<HTMLButtonElement>){

   const { openNav, setState } = props;
   const [isOpen, setIsOpen] = useState<boolean>(false)

   const handleClick = () => {
      setIsOpen(!isOpen)
      setState(prevState => {
         return { ...prevState, openNav: !prevState.openNav  }
      })
   }

   useEffect(() => {
      setIsOpen(openNav)
   },[openNav])

   return(
      <button 
         onClick={handleClick} 
         aria-controls='main-nav' 
         aria-expanded={isOpen}
         ref={ref}
         aria-label='Open Navigation Menu'
         className="hamburger-icon"
        >
         <span className='AT_only'>Menu</span>
         <Hamburger toggled={isOpen} size={25} />
      </button>
   )
}

export default forwardRef(HamburgerIcon)