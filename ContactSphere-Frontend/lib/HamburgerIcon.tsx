import { Divide as Hamburger } from 'hamburger-react'
import { useAppDispatch, useAppSelector } from '../src/customHooks/reduxCustomHooks'
import { setOpenNav } from '../src/RTK/features/slices/openNavMenuSlice'

function HamburgerIcon(){
   
   const dispatch = useAppDispatch()
   const { openNav } = useAppSelector(store => store.openNav)

   return(
      <button 
         onClick={() => dispatch(setOpenNav(!openNav))} 
         aria-controls='main-nav' 
         aria-expanded={openNav ? "true" : "false"}
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