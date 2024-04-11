import { LoginPage } from "@views/MainScreen/Login";
import { MainScreen } from "@views/MainScreen/MainScreen";
import { RegisterPage } from "@views/MainScreen/Register";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export const Routes: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
