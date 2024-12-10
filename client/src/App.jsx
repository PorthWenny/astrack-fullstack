import Home from "./routes/homepage/Home";
import FacilityPage from "./routes/facilitypage/FacilityPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth, RequireAdmin } from "./routes/layout/Layout";
import SinglePage from "./routes/singlepage/SinglePage";
import Login from "./routes/loginpage/Login";
import Profile from "./routes/profilepage/Profile";
import Register from "./routes/register/Register";
import UpdateProfile from "./routes/updatepage/UpdateProfile";
import ReservationPage from "./routes/reservationpage/ReservationPage";
import Directions from "./routes/directionpage/Directions";
import NewFacilityPage from "./routes/admin/newfacilitypage/NewFacilityPage";
import AdminPanel from "./routes/admin/adminpanelpage/AdminPanel";

import {
  singlePageLoader,
  facilityDataLoader,
  facilityPageLoader,
} from "./lib/loaders";

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
          path: "/maps",
          element: <Directions />,
          loader: facilityDataLoader,
        },
        {
          path: "/facilities",
          element: <FacilityPage />,
          loader: facilityPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
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
        {
          path: "/reserve",
          element: <ReservationPage />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAdmin />,
      children: [
        {
          path: "/admin-panel",
          element: <AdminPanel />,
        },
        {
          path: "/add-facility",
          element: <NewFacilityPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
