import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './features/authUserSlice'
import { authQuerySlice } from './features/authQuerySlice'
import { contactsQuerySlice } from './features/contactsQuerySlice'
import snackbarDisplayReducer from './features/snackbarDisplaySlice';
import alertReducer from './features/alertSlice';
import loadingReducer from './features/loadingSlice';
import userDataReducer from './features/userDataSlice';
import contactsMultiSelectReducer from './features/contactMultiSelectSlice';
import wrkSnackbarReducer from './features/wrkSnackbarSlice';
import userLocalSettingReducer from './features/userLocalSettingSlice';
import resolveDuplicatesReducer from './features/resolveDuplicatesSlice';

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
      [authQuerySlice.reducerPath]: authQuerySlice.reducer,
      [contactsQuerySlice.reducerPath]: contactsQuerySlice.reducer,
   },
   middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),authQuerySlice.middleware,contactsQuerySlice.middleware]
})

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>

export default appStore;