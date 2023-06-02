import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:9000" })

export const authQuerySlice = createApi({
   reducerPath: 'authQueryApi',
   baseQuery,
   endpoints: builder => ({})
})