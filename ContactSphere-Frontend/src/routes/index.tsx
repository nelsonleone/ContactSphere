import { Routes, Route, Navigate } from 'react-router-dom'
import {  useAppSelector  } from '../customHooks/reduxCustomHooks'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import NotFoundPage from '../pages/NotFoundPage'
import Homepage from '../pages/Homepage'
import CreateContact from '../pages/CreateContact'
import LabelPage from '../pages/LabelPage'
import ContactViewPage from '../pages/ContactViewPage'
import HelpPage from '../pages/HelpPage'
import HiddenContacts from '../pages/HiddenContacts'
import Trash from '../pages/Trash'

export default function RouteHandler({fetchingContacts}:{ fetchingContacts:boolean }){

  const { beenAuthenticated } = useAppSelector(store => store.authUser)

  return(
    <Routes>
      <Route path="/" element={<Homepage fetchingContacts={fetchingContacts} />} />

      <Route 
        path='/auth/create_account'
        element={
          beenAuthenticated ? (
            <Navigate replace to="/" />
          ) : (
            <SignUpPage />
          )
        }
      />

      <Route 
        path='/auth/signin'
        element={
          beenAuthenticated ? (
            <Navigate replace to="/" />
          ) : (
            <SignInPage />
          )
        }
      />
      {/* Dynamic Routes */}
      <Route path="/labels/:id" element={<LabelPage />} />
      <Route path="/c/:id" element={<ContactViewPage />} />
      <Route path="/c/edit/:id" element={<ContactViewPage />} />

      <Route path="/new" element={<CreateContact />} />
      <Route path="/hidden" element={<HiddenContacts />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}