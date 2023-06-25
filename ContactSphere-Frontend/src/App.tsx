import { useEffect } from 'react'
import { setUserDetails } from './RTK/features/authUserSlice'
import { useGetAuthStateQuery, useGetCsrfTokenQuery } from "./RTK/features/injectedAuthApiQueries";
import { setLoad } from './RTK/features/loadingSlice'
import Layout from './pages/Layout'
import RouteHandler from './routes'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './customHooks/reduxCustomHooks';
import { useGetUserDataQuery } from './RTK/features/injectedContactsApiQueries';
import { setUserData } from './RTK/features/userDataSlice';
import { setShowAlert } from './RTK/features/alertSlice';
import { AlertSeverity, AuthMethod } from './enums';


export default function App(){

  const navigate = useNavigate()
  const { data:UserDetails, isError:getAuthStateError, isLoading:authenticating } = useGetAuthStateQuery()
  const { } = useGetCsrfTokenQuery()

  const { beenAuthenticated, userDetails: {
      uid
    }
  } = useAppSelector((store) => store.authUser)
  const dispatch = useAppDispatch()
  const { data, isError:fetchDataError, isLoading:gettingData } = useGetUserDataQuery(uid || '')

  useEffect(() => {
    // Don't Try Fetch User Data When There Is An Unauthourized User
    if(!beenAuthenticated)return;

    // Fetch User Data
    if(uid){
      if (data){
        dispatch(
          setUserData({
          labels: data.labels,
          contacts: data.contacts,
          })
        )
      }
    
      else if (fetchDataError){
        dispatch(
          setShowAlert({
          alertMessage: 'Error Occured Getting User Data....Reload',
          severity: AlertSeverity.ERROR,
          })
        )
      }
    }
  },[uid,data])
  
  useEffect(() => {

    if(authenticating){
      dispatch(setLoad(true))
    }

    
    else if(getAuthStateError){
      navigate('/auth/signin')
      dispatch(setLoad(false))
    }

    else if(UserDetails && !getAuthStateError && !gettingData){
      dispatch(setUserDetails({...UserDetails,authMethod:AuthMethod.AuthSession}))
      dispatch(setLoad(false))
    }

  },[UserDetails,authenticating,getAuthStateError])

  return(
    <Layout>
      <RouteHandler />
    </Layout>
  )
}