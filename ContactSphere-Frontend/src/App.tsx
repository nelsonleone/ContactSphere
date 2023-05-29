import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Header from './components/Header'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'

export default function App(){
  return(
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/create_account" element={<SignUpPage />} />
      </Routes>
    </>
  )
}