import { useEffect } from 'react'
import { setUserDetails } from './RTK/features/authUserSlice'
import { useGetAuthStateQuery, useGetCsrfTokenQuery } from "./RTK/features/injectedAuthApiQueries";
import { setLoad } from './RTK/features/loadingSlice'
import Layout from './pages/Layout'
import RouteHandler from './routes'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './customHooks/reduxCustomHooks';
import { useGetUserDataQuery } from './RTK/features/injectedContactsApiQueries';
import { setUserData } from './RTK/features/userDataSlice';
import { setShowAlert } from './RTK/features/alertSlice';
import { AlertSeverity, AuthMethod } from './enums';
import { setSelectNone } from './RTK/features/contactMultiSelectSlice';
import { setDuplicates } from './RTK/features/resolveDuplicatesSlice';
import findDuplicates from './utils/helperFns/findDuplicates';


export default function App(){

  const navigate = useNavigate()
  const location = useLocation()
  const { data:UserDetails, isError:getAuthStateError, isLoading:authenticating } = useGetAuthStateQuery()
  const { } = useGetCsrfTokenQuery()
  const { beenAuthenticated, userDetails: {
      uid
    }
  } = useAppSelector((store) => store.authUser)
  const dispatch = useAppDispatch()
  const { data, isError:fetchDataError, isLoading:gettingData } = useGetUserDataQuery(uid || '')
  const { contacts } = useAppSelector(store => store.userData)


  useEffect(() => {
    // Don't Try Set User Data When There Is An Unauthourized User
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
  },[uid,data,fetchDataError])
  



  useEffect(() => {
    if(authenticating){
      dispatch(setLoad(true))
    }

    // Navigate User To Auth Page
    if(!authenticating && getAuthStateError && location.pathname !== "auth/create_account" && location.pathname !== "auth/signin"){
      navigate('/auth/signin')
      dispatch(setLoad(false))
    }

      
    if(UserDetails && !getAuthStateError){
      dispatch(setUserDetails({...UserDetails,authMethod:AuthMethod.AuthSession}))
      dispatch(setLoad(false))
    }

  },[UserDetails,authenticating,getAuthStateError])


  // Empty Multi Select Array
  useEffect(()  => {
    dispatch(setSelectNone())
  },[location.pathname])


  // Find Duplicates In Contacts
  useEffect(() => {
    if(contacts.length){
      const duplicates = findDuplicates(contacts)
      dispatch(setDuplicates(duplicates))
    }
  },[contacts.length])

  return(
    <Layout>
      <RouteHandler fetchingContacts={gettingData} />
    </Layout>
  )
}