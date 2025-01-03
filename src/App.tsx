import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import ServiceProvider from "./Pages/ServiceProvider/ServiceProvider";
import ServiceProviderProfile from "./Pages/ServiceProviderProfile/ServiceProviderProfile";
import ServiceSeekerPage from "./Pages/ServiceSeeker/ServiceSeeker";
import ServiceSeekerProfile from "./Pages/ServiceSeekerDetails/ServiceSeekerProfile";
import ProtectedRoute from "./ProtectedRouter";
import { SERVICEPROVIDER, LOGIN, SERVICESEEKER } from "./Utils/routes";
import Layout from "./Components/Layout/Layout"; // Import Layout component

const router = createBrowserRouter([
  {
    path: SERVICEPROVIDER,
    element: <Layout />, // Layout includes Header and page content
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
        path: `${SERVICEPROVIDER}/:id`, // Dynamic route for ServiceProviderProfile
        element: (
          <ProtectedRoute>
            <ServiceProviderProfile />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: SERVICESEEKER,
    element: <Layout />, // Layout includes Header and page content
    children: [
      {
        path: SERVICESEEKER,
        element: (
          <ProtectedRoute>
            <ServiceSeekerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: `${SERVICESEEKER}/:id`, // Dynamic route for ServiceSeekerProfile
        element: (
          <ProtectedRoute>
            <ServiceSeekerProfile />
          </ProtectedRoute>
        ),
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
