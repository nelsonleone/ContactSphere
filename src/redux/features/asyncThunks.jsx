import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
   addDoc,
   collection,
   doc, 
   getDoc, 
   getDocs, 
   setDoc, 
   updateDoc , 
   query,
   orderBy,
   Timestamp,
   deleteDoc
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { database } from "../../firebase/firebase-features";


export const handleSetUserContactDocs = createAsyncThunk(
   'user,setUserContactDocs',
   async (userID, { dispatch }) => {
      const userRef = doc(database,"users",userID)
      const userContactDocs = await getDoc(userRef)

      if(!userContactDocs.exists()){
         await setDoc(userRef,{})
      }else{
         return await dispatch(handleGetUserContactDocs(userID))
      }
   }
)




export const handleGetUserContactDocs = createAsyncThunk(
   'user,getUserContactDocs',
   async (userID) => {
      const contactCollectionRef = collection(database,"users",userID,"contacts")
      const sortedContactQueryRef = query(contactCollectionRef,orderBy("firstName"))
      try{
         const contactsDocs = await getDocs(sortedContactQueryRef)
         const docArr = []
         contactsDocs.docs.map(doc => {
            docArr.push({id:doc.id,contact:doc.data()})
         })
         return docArr;
      }
      catch(err){
         return err.code;
      }
   }
)



export const setNewContact = createAsyncThunk(
   'user,setNewContact',
   async (value,{ getState }) => {
      const userID = getState().userAuth.authUserDetails.userID;
      const contactCollectionRef = collection(database,"users",userID,"contacts")
      try{
         await addDoc(contactCollectionRef,{...value,isActive:true,isStarred:false,inTrash:false,isHidden:false})
      }
      catch(err){
         return err.code;
      }
   }
)



export const handleContactStarring = createAsyncThunk(
   'user,starContact',
   async (contactProperties, { getState }) => {
      const userID = getState().userAuth.authUserDetails.userID;
      const contactDoc = doc(database,"users",userID,"contacts",contactProperties.id)
      try{
         await updateDoc(contactDoc,{...contactProperties,isStarred:!contactProperties.isStarred})
      }
      catch(err){
         return err.code;
      }
   }
)



export const setAddToTrash = createAsyncThunk(
   'user,setAddToTrash',
   async (contactProperties, { getState }) => {
      const userID = getState().userAuth.authUserDetails.userID;
      const contactDoc = doc(database,"users",userID,"contacts",contactProperties.id)
      const date = new Date()
      const timestamp = Timestamp.fromDate(date)
      const unixTimestamp = timestamp.toDate().getTime()
      try{
         await updateDoc(contactDoc,
         {...contactProperties,
           inTrash:!contactProperties.inTrash,
           isActive:!contactProperties.isActive,
           trashDate:unixTimestamp,
           isStarred:false
         })
      }
      catch(err){
         return err.code;
      }
   }
)

export const getViewedContactDetails = createAsyncThunk(
   'user,getViewedContactDetails',
   async (contactId, { getState }) => {
      const userID = getState().userAuth.authUserDetails.userID;
      const contactDoc = doc(database,"users",userID,"contacts",contactId)
      try{
         const viewedContactDetails = await getDoc(contactDoc)
         const docArr = viewedContactDetails.data()
         return docArr;
      }
      catch(err){
         return err.code;
      }
   }
)

export const setDeleteContactForever = createAsyncThunk(
   'user,deleteContactForever',
   async (contactProperties, { getState }) => {
      const userID = getState().userAuth.authUserDetails.userID;
      const contactDoc = doc(database,"users",userID,"contacts",contactProperties.id)

      try{
         await deleteDoc(contactDoc)
      }
      catch(err){
         return err.code;
      }
   }
)

export const setHidenContact = createAsyncThunk(
   'user,setHidenContact',
   async (contactProperties, { getState }) => {
      const userID = getState().userAuth.authUserDetails.userID;
      const contactDoc = doc(database,"users",userID,"contacts",contactProperties.id)
      try{
         await updateDoc(contactDoc,{...contactProperties,isHidden:!contactProperties.isHidden,isActive:!contactProperties.isActive,isStarred:false})
      }
      catch(err){
         return err.code;
      }
   }
)


export const setEdittedContact = createAsyncThunk(
   'user,setEdittedContact',
   async (edittedContactInfo, { getState }) => {
      const userID = getState().userAuth.authUserDetails.userID;
      const contactDoc = doc(database,"users",userID,"contacts",edittedContactInfo.id)
      try{
         await updateDoc(contactDoc,edittedContactInfo)
      }
      catch(err){
         return err.code;
      }
   }
)


export const getSearchQuery = createAsyncThunk(
   'user,getSearchQuery',
   async (inputValue, { getState }) => {
      const userID = getState().userAuth.authUserDetails.userID;
      const contactsCollection = collection(database,"users",userID,"contacts")
      const contactSearchQuery = query(contactsCollection, where('firstName', '>=', searchInput).where('firstName', '<=', searchInput + '\uf8ff'))

      try{
         const contactsDocs = await getDocs(contactSearchQuery)
         const foundContacts = []
         contactsDocs.map(doc =>  {
            foundContacts.push({id:doc.id,contact:doc.data()})
         })

         return foundContacts;
      }
      catch(err){
         return err.code;
      }
   }
)