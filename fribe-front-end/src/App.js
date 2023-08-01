import { SnackbarProvider } from "notistack";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import "../src/assets/css/style.css";
import "../src/assets/css/breakpoints.css";
import "../src/assets/css/reusable.css";
import { useState } from "react";

const App = () => {
  const [userInfo, setUserInfo] = useState("dashboard");
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <Layout selectedPage={selectedPage} setSelectedPage={setSelectedPage} userInfo={userInfo} setUserInfo={setUserInfo} />
      ),
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" replace />,
    },
  ]);
  return (
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
};

export default App;
