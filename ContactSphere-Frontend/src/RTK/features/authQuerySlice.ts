import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({ baseUrl: "" })

export const authQuerySlice = createApi({
   reducerPath: 'authQueryApi',
   baseQuery,
   endpoints: builder => ({})
})