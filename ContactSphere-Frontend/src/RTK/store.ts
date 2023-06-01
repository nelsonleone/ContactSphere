import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './'

const appStore = configureStore({
   reducer: {
      authUserSlice: auth
   }
})

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>

export default appStore;