import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home/Home';
import Register from '../Pages/Register/Register';
import UserProfile from '../Pages/UserProfile/UserProfile';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path:'/register',
                element: <Register/>
            },
            {
                path:'/user/:email',
                element: <UserProfile/>,
                loader: ({params}) => fetch(`http://localhost:5000/user/${params.email}`)
            }
        ]
    }
])
