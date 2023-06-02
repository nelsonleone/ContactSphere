import { AuthUserDetails, UserCredentials } from '../../vite-env';
import { authQuerySlice } from './authQuerySlice';

const AUTH_URL = '/server/auth';

const extendedAuthQuerySlice = authQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    setNewUser: builder.mutation<AuthUserDetails, UserCredentials>({
      query: (userCredentials) => ({
        url: `${AUTH_URL}/create_account`,
        method: 'POST',
        body: userCredentials,
      }),
    }),

    signInUser: builder.mutation<AuthUserDetails, UserCredentials>({
      query: (userCredentials) => ({
        url: `${AUTH_URL}/signin?method=email_and_password`,
        method: 'POST',
        body: userCredentials,
      }),
    })
  }),
})

export const { useSetNewUserMutation, useSignInUserMutation } = extendedAuthQuerySlice;