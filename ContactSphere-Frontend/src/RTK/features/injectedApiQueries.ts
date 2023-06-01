import { AuthUserDetails, UserCredentials } from "../../vite-env";
import { authQuerySlice } from "./authQuerySlice";


const extendedAuthQueries = authQuerySlice.injectEndpoints({
   endpoints: builder => ({
      setNewUser: builder.mutation<AuthUserDetails, UserCredentials>({
         query: (userCredentials) => (
            {
               url: '/auth/create_account',
               method: 'POST',
               body: userCredentials
            }
         )
      })
   })
})

export const { useSetNewUserMutation } = extendedAuthQueries;