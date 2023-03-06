import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import Homepage from './pages/HomePage'
import AuthManager from './components/Manager'
import ForgottenPassword from './pages/Authentication/ForgottenPassword'
import {useSelector} from 'react-redux'
import Layout from './components/Layout'
import CreateNewContact from './pages/CreateNewContact'
import Trash from './pages/Trash'
import HiddenContacts from './pages/HiddenContacts'
import StarredContacts from './pages/StarredContacts'
import HelpArticle from './pages/HelpArticle'
import ContactView from './pages/ContactView'
import EditSection from './pages/EditSection'

function App() {
  
  const [openNav,setOpenNav] = useState(window.innerWidth >= 1200 ? true : false)
  const { isLoading } = useSelector(store => store.loading)
  const location = useLocation()

  return (
    <div className="App">
      {
        location.pathname !== "/signin" && location.pathname !== "/signup" &&
        location.pathname !== "*" ?
        <Layout openNav={openNav} setOpenNav={value => setOpenNav(value)}/>
        :
        ""
      }
      <AuthManager />
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="forgotten-password" element={<ForgottenPassword />} />
        <Route path="signup" element={<SignUp />} />

        <Route path="/" element={<Homepage />} />
        <Route path="/starred-contacts" element={<StarredContacts />} />
        <Route path="/hidden-contacts" element={<HiddenContacts />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/help" element={<HelpArticle />} />
        <Route path="/create-contact" element={<CreateNewContact />} />
        <Route path="/contact/:contactId" element={<ContactView />} />
        <Route path="/edit/:contactId" element={<EditSection />} />
      </Routes>
    </div>
  )
}

export default App
