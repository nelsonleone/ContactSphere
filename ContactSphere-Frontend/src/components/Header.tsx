import { useNavigate, NavLink } from 'react-router-dom'
import HamburgerIcon from '../../lib/HamburgerIcon'
import { useState } from 'react'
import SearchBar from './SearchBar'
import { Setting, Help } from './UserUtils'

export default function Header(){

   const navigate = useNavigate()
   const [openUserMenu,setOpenUserMenu] = useState<boolean>(false)

   return(
      <header>
         <HamburgerIcon />
         <img 
            src="/images/logo.png" 
            alt="ContactSphere Logo" 
            width={200} 
            height={150}
            onClick={() => navigate('/')}
         />

         <nav>
            <ul>
               <li>
                  <NavLink 
                     to="/"
                     className={({ isActive, isPending }) =>
                        isPending ? "pendingLink" : isActive ? "active" : ""
                     }
                   >
                     <i class="fa-regular fa-user"></i>
                     Contacts
                  </NavLink>
               </li>
               <li>
                  <NavLink 
                     to="/favourites"
                     className={({ isActive, isPending }) =>
                        isPending ? "pendingLink" : isActive ? "activeLink" : ""
                     }
                     >
                     <i class="fa-regular fa-star"></i>
                     Favourites
                  </NavLink>
               </li>
               <li>
                  <NavLink 
                     to="/hidden"
                     className={({ isActive, isPending }) =>
                        isPending ? "pendingLink" : isActive ? "activeLink" : ""
                     }
                     >
                     Hidden
                  </NavLink>
               </li>
               <li>
                  <NavLink 
                     to="/duplicates"
                     className={({ isActive, isPending }) =>
                        isPending ? "pendingLink" : isActive ? "activeLink" : ""
                     }
                     >
                     Duplicates
                  </NavLink>
               </li>
               <li>
                  <NavLink 
                     to="/trash"
                     className={({ isActive, isPending }) =>
                        isPending ? "pendingLink" : isActive ? "active" : ""
                     }
                     >
                     Trash
                  </NavLink>
               </li>
               <li>
                  <button>Labels</button>
               </li>
            </ul>
         </nav>

         <SearchBar />

         <div className="user-utils-container">
            <Setting />
            <Help />
         </div>

        <button 
           className='toggle-user-menu' 
           aria-controls='user-menu' 
           aria-expanded={openUserMenu}
           onClick={() => setOpenUserMenu(prevState => prevState = !prevState)}
           >
           <i className="fa-solid fa-user"></i>
        </button>
      </header>
   )
}