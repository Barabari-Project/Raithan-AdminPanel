import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Home from './Pages/Home/Home';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />, 
    },
    {
        path: '/login',
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
