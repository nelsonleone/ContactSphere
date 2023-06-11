import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" })

export const contactsQuerySlice = createApi({
   reducerPath: 'contactsQueryApi',
   baseQuery,
   endpoints: builder => ({})
})