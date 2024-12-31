import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import ServiceProvider from './Pages/ServiceProvider/ServiceProvider';
import ServiceProviderProfile from './Pages/ServiceProviderProfile/ServiceProviderProfile';
import ProtectedRoute from "./ProtectedRouter";
import { SERVICEPROVIDER, LOGIN } from './Utils/routes';
import Layout from './Components/Layout/Layout';

const router = createBrowserRouter([
    {
        path: SERVICEPROVIDER, // Have to change name
        element: <Layout />,
        children: [
            {
                path: SERVICEPROVIDER,
                element: (
                    <ProtectedRoute>
                        <ServiceProvider />
                    </ProtectedRoute>
                ),

            },
            {
                path: `${SERVICEPROVIDER}/:id`,
                element: <ProtectedRoute><ServiceProviderProfile /></ProtectedRoute>,
            },
        ],
        errorElement: <NotFound />, 
    },
    {
        path: LOGIN,
        element: <Login />,
    },
]);

const App: React.FC = () => {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
