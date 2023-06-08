import { useAppSelector } from '../customHooks/reduxCustomHooks'
import { Route, Redirect } from 'react-router-dom'
import SignInPage from '../pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

export function CustomSignInRoute(){
   const { beenAuthenticated } = useAppSelector(store => store.authUser)
 
   return (
      <Route
       path="/auth/signin"
       render={() => (beenAuthenticated ? <Redirect to="/" /> : <SignInPage />)}
      />
   )
}

export function CustomSignUpRoute(){
   const { beenAuthenticated } = useAppSelector(store => store.authUser)
 
   return (
      <Route
       path="/auth/signup"
       render={() => (beenAuthenticated ? <Redirect to="/" /> : <SignUpPage />)}
      />
   )
}