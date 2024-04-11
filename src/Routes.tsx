import { MainScreen } from '@views/MainScreen/MainScreen';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainScreen />
    }
])

export const Routes: React.FC= () => {
    return <>
        <RouterProvider router={router} />
    </>
}