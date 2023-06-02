import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './features/authUserSlice'
import { authQuerySlice } from './features/authQuerySlice'

const appStore = configureStore({
   reducer: {
      authUser: authUserReducer,
      [authQuerySlice.reducerPath]: authQuerySlice.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authQuerySlice.middleware)
})

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>

export default appStore;