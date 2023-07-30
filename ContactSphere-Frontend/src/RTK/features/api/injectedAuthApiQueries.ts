import { UserCredentials } from '../../../vite-env';
import { authQuerySlice } from './authQuerySlice';

interface IMutationArgs {
  idToken: string,
  csrfToken: string
}

const AUTH_URL = '/auth';

const extendedAuthQuerySlice = authQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    authorizeUser: builder.mutation<'',IMutationArgs>({
      query: (args) => ({
        url: `${AUTH_URL}/authorizeUser`,
        method: 'POST',
        credentials: 'include',
        body: {...args}
      })
    }),

    getCsrfToken: builder.query<void,void>({
      query: () =>  ({
        url: `${AUTH_URL}/setCsrfToken`,
        method: 'GET',
        credentials: 'include'
      })
    }),

    getAuthState: builder.query<UserCredentials,void>({
      query: () => ({
        url: `${AUTH_URL}/setAuthState`,
        method: 'GET',
        credentials: 'include'
      })
    }),

    setAuthSignOut: builder.mutation<void,void>({
      query: () => ({
        url: `${AUTH_URL}/signout`,
        method: 'POST',
        credentials: 'include',
      })
    }),
  }),
})

export const { useSetAuthSignOutMutation, useGetAuthStateQuery, useAuthorizeUserMutation, useGetCsrfTokenQuery } = extendedAuthQuerySlice;