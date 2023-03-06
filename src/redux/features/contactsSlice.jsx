import { createSlice } from "@reduxjs/toolkit";
import {
   handleGetUserContactDocs,
   setNewContact,
   handleContactStarring,
   handleSetUserContactDocs,
   getViewedContactDetails,
   setEdittedContact
} from "./asyncThunks";


const initialState = {
   contactsData:{
      activeContacts:[],
      hiddenContacts:[],
      inTrash:[],
      starredContacts:[]
   },
   error:"",
   isFetching:null,
   viewedContactDetails: {}
}

const contactsSlice = createSlice({
   name:"contacts",
   initialState,
   reducers:{
   },
   extraReducers: builder => {
      builder

         // set contact fragment / get contacts Data
         .addCase(handleGetUserContactDocs.pending,state => {
            state.isFetching = true;
         })

        .addCase(handleGetUserContactDocs.fulfilled,(state,{payload}) => { 
            state.contactsData.activeContacts = []
            state.contactsData.starredContacts = []
            state.contactsData.hiddenContacts = []
            state.contactsData.inTrash = []

            payload ? payload.filter(value => {
               const {contact, id} = value;
               return contact.isActive && state.contactsData.activeContacts.push({...contact,id:id})
            }) :[]

            payload ? payload.filter(value => {
               const {contact, id} = value;
               return contact.isHidden && state.contactsData.hiddenContacts.push({...contact,id:id})
            }) :[]

            payload ? payload.filter(value => {
               const {contact, id} = value;
               return contact.isStarred && state.contactsData.starredContacts.push({...contact,id:id})
            }) :[]

            payload ? payload.filter(value => {
               const {contact, id} = value;
               return contact.inTrash && state.contactsData.inTrash.push({...contact,id:id})
            }) :[]

            state.isFetching = false;
        })

        .addCase(handleSetUserContactDocs.rejected,(state,{payload}) => {
           state.error = payload;
         }) 
         
      // add new contact
      .addCase(setNewContact.rejected,(state,{payload}) => {
         state.error  =  payload;
      })

      // // edit contact
      
      .addCase(setEdittedContact.rejected,(state,{payload}) => {
         state.error  =  payload;
      })

      // viewed Contact
      .addCase(getViewedContactDetails.pending,(state) => {
         state.isFetching  =  true;
      })
      .addCase(getViewedContactDetails.fulfilled,(state,{payload}) => {
         state.viewedContactDetails = payload;
         state.isFetching = false;
      })
      .addCase(getViewedContactDetails.rejected,(state) => {
         state.isFetching = false;
      })

   }
})

export default contactsSlice.reducer;