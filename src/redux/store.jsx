import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import UserAuthReducer from "./features/userAuthSlice";
import LoadingReducer from "./features/loadingSlice";
import ContactsSliceReducer from "./features/contactsSlice";


const ContactAppStore = configureStore({
   reducer:{
      userAuth:UserAuthReducer,
      loading:LoadingReducer,
      contact:ContactsSliceReducer,
   }
})

export default ContactAppStore;
