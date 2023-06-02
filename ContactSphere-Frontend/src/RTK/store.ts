import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './features/authUserSlice'
import { authQuerySlice } from './features/authQuerySlice'
import snackbarDisplayReducer from './features/snackbarDisplaySlice';
import alertReducer from './features/alertSlice';

const appStore = configureStore({
   reducer: {
      authUser: authUserReducer,
      alert: alertReducer,
      snackbar: snackbarDisplayReducer,
      [authQuerySlice.reducerPath]: authQuerySlice.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authQuerySlice.middleware)
})

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>

export default appStore;