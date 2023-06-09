import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './RTK/features/authUserSlice'
import { useGetAuthStateQuery, useGetCsrfTokenQuery } from "./RTK/features/injectedApiQueries";
import { setLoad } from './RTK/features/loadingSlice'
import Layout from './pages/Layout'
import RouteHandler from './routes'
import { useNavigate } from 'react-router-dom';


export default function App(){

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data:UserDetails, isError, isLoading } = useGetAuthStateQuery()
  const { data:response } = useGetCsrfTokenQuery()
  
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
    <Layout>
      <RouteHandler />
    </Layout>
  )
}