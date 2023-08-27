import { useEffect } from 'react'
import { setUserDetails } from './RTK/features/slices/authUserSlice'
import { setLoad } from './RTK/features/slices/loadingSlice'
import Layout from './pages/Layout'
import RouteHandler from './routes'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './customHooks/reduxCustomHooks';
import { useGetUserDataQuery } from './RTK/features/api/injectedContactsApiQueries';
import { setUserData } from './RTK/features/slices/userDataSlice';
import { setShowAlert } from './RTK/features/slices/alertSlice';
import { setDuplicates } from './RTK/features/slices/resolveDuplicatesSlice';
import findDuplicates from './utils/helperFns/findDuplicates'
import { AlertSeverity, AuthMethod } from './enums';
import { setSelectNone } from './RTK/features/slices/contactMultiSelectSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseClient/firebaseInit';


export default function App(){

  const navigate = useNavigate()
  const location = useLocation()
  const { beenAuthenticated, userDetails: {
      uid
    }
  } = useAppSelector((store) => store.authUser)
  const dispatch = useAppDispatch()
  const { data, isError:fetchDataError, isLoading:gettingData } = useGetUserDataQuery(uid || '')
  const { contacts } = useAppSelector(store => store.userData)
  const foundDuplicates = findDuplicates(contacts)

  if(foundDuplicates?.length){
    dispatch(setDuplicates(foundDuplicates))
  }
  else{
    dispatch(setDuplicates([]))
  }


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
    dispatch(setLoad(true))

    const unSubscribe = onAuthStateChanged(auth,user => {
      if(!user){
        // Navigate User To Auth Page
        if(location.pathname !== "auth/create_account" && location.pathname !== "auth/signin"){
          navigate('/auth/signin')
        }
        dispatch(setLoad(false))
      }

      else if(user){
        dispatch(setUserDetails({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          authMethod: AuthMethod.AuthSession,
          uid: user.uid
        }))
        dispatch(setLoad(false))
      }

    })

    return () => {
      unSubscribe()
    }

  },[])


  // Empty Multi Select Array
  useEffect(()  => {
    dispatch(setSelectNone())
  },[location.pathname])


  return(
    <Layout>
      <RouteHandler fetchingContacts={gettingData} />
    </Layout>
  )
}