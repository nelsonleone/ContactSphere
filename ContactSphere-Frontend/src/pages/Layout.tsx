import { ReactNode, useState, useEffect } from "react";
import Loader from "../../lib/loaders/Loader";
import CreateNewContactButton from "../../lib/buttons/CreateNewContactButton";
import CustomAlert from "../../lib/popups/CustomAlert";
import CustomSnackbar from "../../lib/popups/CustomSnackbar";
import Header from "../components/Header";
import { useAppSelector, useAppDispatch } from '../customHooks/reduxCustomHooks'
import { useGetUserDataQuery } from "../RTK/features/injectedContactsApiQueries";
import { setUserData } from "../RTK/features/userDataSlice";
import { setShowAlert } from "../RTK/features/alertSlice";
import { AlertSeverity } from "../enums";

export default function Layout({children}:{ children:ReactNode}){

   const [resizePageWidth, setResizePageWidth] = useState(window.innerWidth > 960)
   const { uid } = useAppSelector(store => store.authUser.userDetails)
   const dispatch = useAppDispatch()
   const { data, isError } = useGetUserDataQuery(uid || '')

   useEffect(() => {

      if(data){
         dispatch(setUserData({
            labels: data?.labels,
            contacts: data?.contacts
         }))
      }

      else if(isError){
         dispatch(setShowAlert({
            alertMessage: "Error Occured Getting User Data",
            severity: AlertSeverity.ERROR
         }))
      }
   }, [])
   

   return(
      <div className={resizePageWidth ? "app-layout resize-page" : "app-layout"}>
         <Header setResizePageWidth={setResizePageWidth} />
         <CreateNewContactButton />
         {children}
         <CustomSnackbar />
         <CustomAlert />
         <Loader />
      </div>
   )
}