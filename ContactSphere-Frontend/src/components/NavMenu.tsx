import { NavLink } from "react-router-dom";
import { BiUser , BiStar , BiTrashAlt, BiPlus } from 'react-icons/bi'
import { FiEyeOff } from 'react-icons/fi'
import { GrClone } from 'react-icons/gr'
import OutsideClicksHandler from "./HOCs/OutsideClicksHandler";
import { UsedHOC } from "../vite-env";

function NavMenu(props:UsedHOC){
   return(
      <nav className='main_nav' id="main-nav">
         <ul>
            <li>
               <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                     isPending ? "pendingLink" : isActive ? "activeLink" : ""
                  }
               >
                  <BiUser />
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
                  <BiStar />
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
                  <FiEyeOff />
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
                  <GrClone />
                  Duplicates
               </NavLink>
            </li>
            <li>
               <NavLink 
                  to="/trash"
                  className={({ isActive, isPending }) =>
                     isPending ? "pendingLink" : isActive ? "activeLink" : ""
                  }
                  >
                  <BiTrashAlt />
                  Trash
               </NavLink>
            </li>
            <li>
               <button>Labels<BiPlus /></button>
            </li>
         </ul>
      </nav>
   )
}

export default OutsideClicksHandler(NavMenu)