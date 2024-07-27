import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { server } from '../constants/config'


const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/mobile/` }),
    tagTypes: ['User'],

    endpoints: (builder) => ({

        updateProfile: builder.mutation({
            query: (data) => ({
                url: 'updateprofile',
                method: 'PUT',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export default api;
export const { 
    useUpdateProfileMutation
 } = api;