import { CiUser } from 'react-icons/ci'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'
import { BiHide } from 'react-icons/bi'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'


export default function NavSection(props){

   const { openNav, setOpenNav } = props;
   const navDisplayStyling = {
      display:  openNav ? "block" : "none"
   }

   useEffect(() => {
      function resize(){
         window.addEventListener('resize',()=> {
            window.innerWidth >= 1200 ? setOpenNav(true) : setOpenNav(false)
         })
      }
      resize()

      return () =>  window.removeEventListener('resize',resize)
   },[window.innerWidth])


   return(
      <nav className="main-nav" id="main-nav" style={navDisplayStyling}>
         <div>
            <ul>
               <li>
                  <CiUser className="contacts-icon"/>
                  <NavLink to="/">Contacts</NavLink>
               </li>
               <li>
                  <AiOutlineFieldTime className="frequently-icon" />
                  <NavLink to="/starred-contacts">Starred</NavLink>
               </li>
            </ul>
            <ul>
               <li>
                  <BiHide className="hide-icon"/>
                  <NavLink to="/hidden-contacts">Hidden Contacts</NavLink>
               </li>
               <li>
                  <FaTrash className="trash-icon"/>
                  <NavLink to="/trash">Trash</NavLink>
               </li>
            </ul>
         </div>
      </nav>
   )
}