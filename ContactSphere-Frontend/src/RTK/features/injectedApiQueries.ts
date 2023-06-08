import { UserCredentials } from '../../vite-env';
import { authQuerySlice } from './authQuerySlice';

interface IMutationArgs {
  idToken: string,
  csrfToken: string
}

const AUTH_URL = '/server/auth';

const extendedAuthQuerySlice = authQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    authorizeUser: builder.mutation<'',IMutationArgs>({
      query: (args) => ({
        url: `${AUTH_URL}/authorizeUser`,
        method: 'POST',
        body: {...args}
      })
    }),

    getCsrfToken: builder.query({
      query: () => `${AUTH_URL}/setCsrfToken`
    }),

    getAuthState: builder.query<UserCredentials,''>({
      query: () => `${AUTH_URL}/setAuthState`
    })
  }),
})

export const { useGetAuthStateQuery, useAuthorizeUserMutation, useGetCsrfTokenQuery } = extendedAuthQuerySlice;