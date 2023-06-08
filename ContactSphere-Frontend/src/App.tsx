import { Routes, Route, useNavigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Header from './components/Header'
import NotFoundPage from './pages/NotFoundPage'
import CustomSnackbar from '../lib/popups/CustomSnackbar'
import CustomAlert from '../lib/popups/CustomAlert'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './RTK/features/authUserSlice'
import { useGetAuthStateQuery, useGetCsrfTokenQuery } from "./RTK/features/injectedApiQueries";
import { setLoad } from './RTK/features/loadingSlice'

export default function App(){

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data:UserDetails, isError, isLoading } = useGetAuthStateQuery('')
  const { data:response } = useGetCsrfTokenQuery('')
  
  useEffect(() => {

    if(isLoading){
      dispatch(setLoad(true))
    }

    
    else if(isError){
      navigate('/auth/signin')
      dispatch(setLoad(false))
    }

    else if(UserDetails && !isError){
      dispatch(setUserDetails(UserDetails))
      dispatch(setLoad(false))
    }

  },[UserDetails,isLoading,isError])

  return(
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Cust
        <Route path="/auth/create_account" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CustomSnackbar />
      <CustomAlert />
    </>
  )
}