import { NavLink } from "react-router-dom";
import { BiUser , BiErrorCircle, BiStar , BiTrashAlt, BiPlus } from 'react-icons/bi'
import { FiEyeOff } from 'react-icons/fi'
import { GrClone } from 'react-icons/gr'
import { Dispatch, SetStateAction, memo } from "react";
import { FiLogIn } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';
import { useAppSelector } from '../customHooks/reduxCustomHooks'
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { IHeaderState } from "./Header";
import { MdLabel } from 'react-icons/md'
import { Breakpoints } from "../enums";

interface IProps{
   setState: Dispatch<SetStateAction<IHeaderState>>,
   openNav: boolean
}

function NavMenu(props:IProps){

   const { beenAuthenticated } = useAppSelector(store => store.authUser)
   const { labels, contacts } = useAppSelector(store => store.userData)
   
   const handleClickAway = () => {
      // don't close navMenu automatically on larger screens
      if (window.innerWidth >= Breakpoints.Large )return;
      props.setState(prevState => (
         {
            ...prevState, openNav: false
         }
      ))
   }

   return(
     <ClickAwayListener
         mouseEvent="onMouseDown"
         touchEvent="onTouchStart"
         onClickAway={handleClickAway}
         >
         <nav className={props.openNav ? 'main_nav' : 'main_nav hide_nav'} id="main-nav">
            {
               beenAuthenticated ?
               <ul>
                  <li>
                     <NavLink to="/" className="contact_page_link">
                        <BiUser title="User icon"  />
                        Contacts
                        {
                           contacts.length ?
                           <span aria-label="Saved Contacts Count">{contacts.length}</span>
                           :
                           null
                        }
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to="/favourites">
                        <BiStar title="Star icon" />
                        Favourites
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to="/hidden">
                        <FiEyeOff title="Eye icon"  />
                        Hidden
                     </NavLink>
                  </li>

                  <div>
                     <p id="fxm_id">Fix & manage</p>
                     <li aria-labelledby="fxm_id">
                        <NavLink to="/duplicates">
                           <GrClone title="clone/duplicate icon" />
                           Duplicates
                           <BiErrorCircle title="error icon" />
                        </NavLink>
                     </li>
                     <li aria-labelledby="fxm_id">
                        <NavLink to="/trash">
                           <BiTrashAlt title="Trash"  />
                           Trash
                        </NavLink>
                     </li>
                  </div>

                  <li className="label-area">
                     <button>
                        <span>Labels</span>
                        <BiPlus title="plus icon"  />
                     </button>

                     <ul>
                        {
                           labels && labels.map(value => {
                              return(
                                 <li key={value._id} >
                                    <NavLink to={`/labels/${value._id}`}>
                                       <MdLabel />
                                       <span>{value.label}</span>
                                    </NavLink>
                                 </li>
                              )
                           })
                        }
                     </ul>
                  </li>
               </ul>
               :
               <ul>
                  <li>
                     <NavLink to="/auth/signin">
                        <FiLogIn title="Login icon" />
                        Sign In
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to="/auth/create_account">
                        <FaUserPlus title="User Join"  />
                        Create Account
                     </NavLink>
                  </li>
               </ul>
            }
         </nav>
      </ClickAwayListener>
   )
}

export default memo(NavMenu)