import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import UserAuthReducer from "./features/userAuthSlice";
import LoadingReducer from "./features/loadingSlice";
import ContactsSliceReducer from "./features/contactsSlice";
import ContactSearchReducer from "./features/searchSlice"


const ContactAppStore = configureStore({
   reducer:{
      userAuth:UserAuthReducer,
      loading:LoadingReducer,
      contact:ContactsSliceReducer,
      search:ContactSearchReducer
   }
})

export default ContactAppStore;
