import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Root from './Components/Pages/Root/Root';
import Home from './Components/Home/Home';
import OurServices from './Components/Home/OurServices/OurServices';
import ServiceDetails from './Components/Home/ServiceDetails/ServiceDetails';
import OurPricing from './Components/Home/OurPricing/OurPricing';


import Login from './Components/Pages/Login/Login';

import Coverage from './Components/Pages/Coverage/Coverage';
import Register from './Components/Pages/Register/Register';
import Authprovider from './Components/AuthProvider/AuthProvider';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoute from './Routes/AdminRoute';
import AdminPanel from './Components/Pages/Dashboard/AdminPanel/AdminPanel';
import ManageUsers from './Components/Pages/Dashboard/ManageUsers/ManageUsers';



import AddParcel from './Components/Pages/AddParcel/AddParcel';

import ParcelChart from './Components/Pages/ParcelChart/ParcelChart';
import AllParcels from './Components/Pages/Dashboard/AllParcels/AllParcels';

import UserPrivateRoute from './Components/Pages/UserPrivateRoute/UserPrivateRoute';
import MyPercels from './Components/Pages/MyPercels/MyPercels';
import UpdateProfile from './Components/Pages/UpdateProfile/UpdateProfile';
import { HelmetProvider } from 'react-helmet-async';


import AdminParcel from './Components/Pages/Dashboard/AdminParcel/AdminParcel';






const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element:<Home></Home>, 
        // loader: () => fetch('/realestate.json')
      },
      {
        path: '/services',
        element:<OurServices></OurServices> ,
        
      },
      {
        path: '/services/:serviceName',
        element: <ServiceDetails></ServiceDetails>,
        
      },
      {
        path: '/our-plans',
        element: <OurPricing></OurPricing>,
        
      },
      {
      
        path: '/coverage',
        element: <Coverage></Coverage>
        
      },
      {
      
        path: '/register',
        element: <Register></Register>
        
      },
      {
      
        path: '/add-parcel',
        element:<AddParcel></AddParcel>
        
      },
      {
      
        path: '/parcel-Chart',
        element:<ParcelChart></ParcelChart>
        
      },
      {
      
        path: '/my-percels',
        element: <UserPrivateRoute><MyPercels></MyPercels></UserPrivateRoute>
        
      },
      {
      
        path: '/update-profile',
        element:<UserPrivateRoute><UpdateProfile></UpdateProfile></UserPrivateRoute>
        
      },
      {
      
        path: '/login',
        element: <Login></Login>
        
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="manage-users" replace />,
          },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "all-parcels", element: <AllParcels /> },
          { path: "settings", element: <AdminParcel/> },
          // { path: "unauthorised", element: <Unauthorised /> },
        ],
      },
     
    
    ]
  
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
    <HelmetProvider>
    <RouterProvider router={router}></RouterProvider>
    </HelmetProvider>
    </Authprovider>
 
  </React.StrictMode>,
)
