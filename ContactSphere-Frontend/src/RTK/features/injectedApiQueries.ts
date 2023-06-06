import { authQuerySlice } from './authQuerySlice';

const AUTH_URL = '/server/auth';

const extendedAuthQuerySlice = authQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    authorizeUser: builder.mutation<'',string>({
      query: (idToken) => ({
        url: `${AUTH_URL}/authorizeUser`,
        method: 'POST',
        body: idToken
      })
    })
  }),
})

export const { useAuthorizeUserMutation } = extendedAuthQuerySlice;