import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './features/slices/authUserSlice'
import { authQuerySlice } from './features/api/authQuerySlice'
import { contactsQuerySlice } from './features/api/contactsQuerySlice'
import snackbarDisplayReducer from './features/slices/snackbarDisplaySlice';
import alertReducer from './features/slices/alertSlice';
import loadingReducer from './features/slices/loadingSlice';
import userDataReducer from './features/slices/userDataSlice';
import contactsMultiSelectReducer from './features/slices/contactMultiSelectSlice';
import wrkSnackbarReducer from './features/slices/wrkSnackbarSlice';
import userLocalSettingReducer from './features/slices/userLocalSettingSlice';
import resolveDuplicatesReducer from './features/slices/resolveDuplicatesSlice';
import simpleModalReducer from './features/slices/simpleModalSlice';
import searchContactsReducer from './features/slices/searchContactsSlice';
import shouldDiscardChangesReducer from './features/slices/shouldDiscardChangesSlice';
import openNavMenuReducer from './features/slices/openNavMenuSlice';

const appStore = configureStore({
   reducer: {
      authUser: authUserReducer,
      alert: alertReducer,
      snackbar: snackbarDisplayReducer,
      loading: loadingReducer,
      userData: userDataReducer,
      wrkSnackbar: wrkSnackbarReducer,
      multiSelect: contactsMultiSelectReducer,
      userLocalSetting: userLocalSettingReducer,
      resolveDuplicates: resolveDuplicatesReducer,
      searchContacts: searchContactsReducer,
      shouldDiscardChanges: shouldDiscardChangesReducer,
      simpleModal: simpleModalReducer,
      openNav: openNavMenuReducer,
      [authQuerySlice.reducerPath]: authQuerySlice.reducer,
      [contactsQuerySlice.reducerPath]: contactsQuerySlice.reducer,
   },
   middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),authQuerySlice.middleware,contactsQuerySlice.middleware]
})

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>

export default appStore;