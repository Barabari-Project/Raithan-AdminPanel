import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <NotFound />, // Renders if no matching route is found
    },
    {
        path: '/abc',
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
