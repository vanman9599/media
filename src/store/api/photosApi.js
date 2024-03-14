import React from 'react'
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Faker } from '@faker-js/faker'
const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://locahost:3005'
    }), 
    endpoints(builder){
        return{
            fetchPhotos: builder.query({
                query: (album)=>{
                    return{
                        url: '/photos',
                        params:{
                            albumId: album.id
                        },
                        method: 'GET'
                    }
                }
            }),
            addPhoto: builder.mutation({
                query: (album)=>{
                    return {
                        method: 'POST',
                        url: '/photos',
                        body: {
                            albumId: album.id,
                            url: Faker.image.abstract(150,150,true)
                        }
                    }
                }
            }),
            removePhoto: builder.mutation({
                query: (photo)=>{
                    return{
                        method: 'DELETE', 
                        url: `/photos/${photo.id}`
                    }
                }
            })
        }
    }
})


export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} = photosApi;
export {photosApi}