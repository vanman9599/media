import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./api/albumsApi";
import { photosApi } from "./api/photosApi";

export const store = configureStore({
    reducer: {
        users: usersReducer, 
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer
    }, 
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware()
        .concat(albumsApi.middleware)
        .concat(photosApi.middleware)
    }
})

setupListeners(store.dispatch);
export * from './thunk/fetchUsers';
export * from './thunk/addUser'
export * from './thunk/removeUser'
export {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} from './api/albumsApi'
export {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} from './api/photosApi'