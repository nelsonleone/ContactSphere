import { Routes, Route, Navigate } from 'react-router-dom'
import {  useAppSelector  } from '../customHooks/reduxCustomHooks'
import SignUpPage from '../pages/SignUpPage'
import SignInPage from '../pages/SignInPage'
import NotFoundPage from '../pages/NotFoundPage'
import Homepage from '../pages/Homepage'

export default function RouteHandler(){

  const { beenAuthenticated } = useAppSelector(store => store.authUser)

  return(
    <Routes>
      <Route path="/" element={<Homepage />} />
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}