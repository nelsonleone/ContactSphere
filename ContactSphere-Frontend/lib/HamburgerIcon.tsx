import { Divide as Hamburger } from 'hamburger-react'
import React, { Dispatch, MouseEvent, SetStateAction, useEffect } from 'react'
import { useState } from 'react'
import { IHeaderState } from '../src/components/Header'

interface IProps{
   setState: Dispatch<SetStateAction<IHeaderState>>,
   openNav: boolean
}

function HamburgerIcon(props:IProps){

   const { openNav, setState } = props;
   const [isOpen, setIsOpen] = useState<boolean>(false)

   const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setIsOpen(!isOpen)

      // Prevention Against NavMenu Flashing[Off and On Again] due to the nature of the ClickawayListener
      if(window.innerWidth < 640 && openNav){
        () => {}
      }else{
         setState(prevState => {
            return { ...prevState, openNav: !prevState.openNav   }
         })
      }
   }

   useEffect(() => {
      setIsOpen(openNav)
   },[openNav])

   return(
      <button 
         onClick={handleClick} 
         aria-controls='main-nav' 
         aria-expanded={isOpen ? "true" : "false"}
         aria-haspopup="true"
         type="button"
         aria-label='Open Navigation Menu'
         className="hamburger-icon"
        >
         <span className='AT_only'>Menu</span>
         <Hamburger toggled={false} size={23} />
      </button>
   )
}

export default HamburgerIcon;