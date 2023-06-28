import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  prepareHeaders: (headers) => {
    
    if (headers.method === 'POST' && headers.url.includes('/contacts/setNewContact')) {
      headers.set('Content-Type', 'multipart/form-data')
    }
    
    return headers;
  }
})

export const contactsQuerySlice = createApi({
  reducerPath: 'contactsQueryApi',
  baseQuery,
  tagTypes: ['Contact','Label'],
  endpoints: builder => ({})
})