import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Components/Pages/Root/Root';
import Home from './Components/Home/Home';
import OurServices from './Components/Home/OurServices/OurServices';
import ServiceDetails from './Components/Home/ServiceDetails/ServiceDetails';
import OurPricing from './Components/Home/OurPricing/OurPricing';

import JoinUs from './Components/Pages/JoinUs/JoinUs';
import Login from './Components/Pages/Login/Login';

import Coverage from './Components/Pages/Coverage/Coverage';

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
      
        path: '/joinus',
        element: <JoinUs></JoinUs>
        
      },
      {
      
        path: '/login',
        element: <Login></Login>
        
      },
     
    
    ]
  
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
