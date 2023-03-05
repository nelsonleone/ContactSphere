import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect , useState} from "react";
import { useSelector } from "react-redux";
import { database } from "../firebase/firebase-features";
import { useDispatch } from "react-redux"
import { setLoading } from '../redux/features/loadingSlice'
import Loading from './Loading'
import { Alert , AlertTitle} from "@mui/material"
import { handleSetUserContactDocs } from "../redux/features/asyncThunks";



export default function ContactsHandler(){

   const dispatch = useDispatch()
   const  { userID } = useSelector(store => store.userAuth.authUserDetails)
   const { error } = useSelector(store => store.contact.contactsData)


   useEffect(() => {
      if(!userID)return;
      dispatch(handleSetUserContactDocs(userID))
   },[userID])


   useEffect(()=> {
      if(!userID) return;

      const contactCollectionRef = collection(database,"users",userID,"contacts")
      const unsubscribe = onSnapshot(contactCollectionRef,(snapshot) => {
         dispatch(handleSetUserContactDocs(userID))
      })

      return() => unsubscribe()
   },[userID])

   return(
      <>
         {
            error &&
            <Alert severity="error" className="alert-box">
               <AlertTitle>Error</AlertTitle>
               <span>
                  {error} — Try Again!
               </span>
            </Alert>
         }
      </>
   )
}