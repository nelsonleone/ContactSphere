import Hamburger  from 'hamburger-react'
import { BiHelpCircle } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import { FaSignOutAlt } from 'react-icons/fa'
import {  useState, useCallback , useEffect, useRef} from 'react'
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase-features'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser } from '../redux/features/userAuthSlice'
import Search from './Search'

export default function Header(props){

   const { setOpenNav , openNav } = props;
   const [openWidjet,setOpenWidjet] = useState(false)
   const [modalOpen,setModalOpen] = useState(false)
   const [showMailLink,setShowMailLink] = useState(false)
   const { beenAuthenticated, authUserDetails } = useSelector(store => store.userAuth)
   const widjetRef = useRef(null)
   const openWidjetImageRef = useRef(null)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   function handleSignOut(){
      dispatch(signOutUser())
      setTimeout(() => {
         navigate("/signin")
      }, 3000);
   }

   const handleOutsideContentClicks = useCallback((e) =>{
      if(widjetRef.current && !widjetRef.current.contains(e.target) && !openWidjetImageRef.current.contains(e.target)){
         setOpenWidjet(false)
      }
   },[])


   useEffect(() => {
      document.addEventListener('mouseup',handleOutsideContentClicks)

      return()  => window.removeEventListener('mouseup',handleOutsideContentClicks)
   },[handleOutsideContentClicks])

   useEffect(() => {
      document.addEventListener('keydown',handleOutsideContentClicks)

      return()  => window.removeEventListener('keydown',handleOutsideContentClicks)
   },[handleOutsideContentClicks])


   return(
      <header>
        <div>
            <button 
               className={openNav ?  "nav-toggle nav-toggle-toggled" : "nav-toggle"}
               aria-controls="main-nav" 
               aria-expanded={openNav}
               onClick={() => setOpenNav(!openNav)}
               >
               <Hamburger size={28} toggled={openNav}/>
            </button>
            <Logo className={!openNav ? "logo" : "logo toggledNav-logoView" }/>
        </div>
        <Search />
        <div className="header-actionIcons">
            <img 
               src={authUserDetails.photoURL ? authUserDetails.photoURL : "/images/userIcon.webp"}
               alt="user's image" 
               className="user-image" 
               aria-controls="header-widjet"
               aria-expanded={openWidjet}
               title="Open Profile Section"
               ref={openWidjetImageRef}
               onClick={() => setOpenWidjet(!openWidjet)}
            />
            {
               openWidjet &&
               <div className="header-widjet" id="header-widjet"  ref={widjetRef}>
                  <MdClose className="icon-closeWidjet" onClick={() => setOpenWidjet(false)} aria-controls="header-widjet" aria-expanded={openWidjet.toString()} />
                  <div className="widjet-userDetails">
                     {
                        authUserDetails.displayName &&
                        <p>{authUserDetails.displayName}</p>
                     }
                     <p>{authUserDetails?.email}</p>
                  </div>
                  <div className="flex-row">
                     <div className="help-link-container">
                        <Link to="/help">
                          <BiHelpCircle className="help-icon" title="View Help" onClick={() => setShowMailLink(!showMailLink)} />
                        </Link>
                     </div>
                     <FaSignOutAlt className="signout-icon" title="Sign Out" onClick={() => setModalOpen(true)} />

                     {
                        modalOpen &&
                        <div className="widjet-modal" >
                           <div>
                              <span>Sure You Want To Sign Out</span>
                              <div className="flex-row">
                                 <button onClick={handleSignOut}>Yes</button>
                                 <button onClick={() => setModalOpen(false)}>Cancel</button>
                              </div>
                           </div>
                        </div>
                     }
                  </div>
           </div>
         }
        </div>
      </header>
   )
}