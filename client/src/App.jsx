import Home from "./routes/homepage/Home";
import FacilityPage from "./routes/facilitypage/FacilityPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/Layout";
import SinglePage from "./routes/singlepage/SinglePage";
import Login from "./routes/loginpage/Login";
import Profile from "./routes/profilepage/Profile";
import Register from "./routes/register/Register";
import UpdateProfile from "./routes/updatepage/UpdateProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/facility",
          element: <FacilityPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/update",
          element: <UpdateProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
