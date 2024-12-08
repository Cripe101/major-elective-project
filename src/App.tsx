import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UpdateProfile from "./components/UpdateProfile";
import ArchivedStudents from "./pages/ArchivedStudents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/archived",
        element: <ArchivedStudents />,
      },
    ],
  },
  {
    path: "/login",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Signin />,
      },
      {
        path: "/login/signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
