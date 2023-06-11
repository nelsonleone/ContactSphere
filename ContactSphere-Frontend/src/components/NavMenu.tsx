import { NavLink } from "react-router-dom";
import { BiUser , BiStar , BiTrashAlt, BiPlus } from 'react-icons/bi'
import { FiEyeOff } from 'react-icons/fi'
import { GrClone } from 'react-icons/gr'
import OutsideClicksHandler from "./HOCs/OutsideClicksHandler";
import { UsedHOC } from "../vite-env";
import { memo } from "react";
import { FiLogIn } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import { useAppSelector } from '../customHooks/reduxCustomHooks'

function NavMenu(props:UsedHOC){

   const { beenAuthenticated } = useAppSelector(store => store.authUser)

   return(
      <nav className={props.openNav ? 'main_nav' : 'main_nav hide_nav'} id="main-nav">
         {
            beenAuthenticated ?
            <ul>
               <li>
                  <NavLink to="/">
                     <BiUser />
                     Contacts
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/favourites">
                     <BiStar />
                     Favourites
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/hidden">
                     <FiEyeOff />
                     Hidden
                  </NavLink>
               </li>

               <div>
                  <p id="fxm_id">Fix & manage</p>
                  <li aria-labelledby="fxm_id">
                     <NavLink to="/duplicates">
                        <GrClone />
                        Duplicates
                     </NavLink>
                  </li>
                  <li aria-labelledby="fxm_id">
                     <NavLink to="/trash">
                        <BiTrashAlt />
                        Trash
                     </NavLink>
                  </li>
               </div>

               <li className="label-area">
                  <button>
                     <span>Labels</span>
                     <BiPlus />
                  </button>
               </li>
            </ul>
            :
            <ul>
               <li>
                  <NavLink to="/auth/signin">
                     <FiLogIn />
                     Sign In
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/auth/create_account">
                     <FaUserPlus />
                     Create Account
                  </NavLink>
               </li>
            </ul>
         }
      </nav>
   )
}

export default memo(OutsideClicksHandler(NavMenu))