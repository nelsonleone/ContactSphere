import { useNavigate, Link } from 'react-router-dom'
import HamburgerIcon from '../../lib/HamburgerIcon'
import { useState } from 'react'
import SearchBar from './SearchBar'

export default function Header(){

   const navigate = useNavigate()
   const [openUserMenu,setOpenUserMenu] = useState<boolean>(false)

   return(
      <header>
         <HamburgerIcon />
         <img 
            src="/images/logo.png" 
            alt="ContactSphere Logo" 
            width={100} 
            height={100}
            onClick={() => navigate('/')}
         />

         <nav>
            <ul>
               <li>
                  <Link to="/">Contacts</Link>
               </li>
               <li>
                  <Link to="/contacts/favourites">Favourites</Link>
               </li>
               <li>
                  <Link to="/contacts/hidden">Hidden</Link>
               </li>
               <li>
                  <Link to="/contacts/trash">Trash</Link>
               </li>
            </ul>
         </nav>

         <SearchBar />

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