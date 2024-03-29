import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL })

export const authQuerySlice = createApi({
   reducerPath: 'authQueryApi',
   baseQuery,
   endpoints: () => ({})
})