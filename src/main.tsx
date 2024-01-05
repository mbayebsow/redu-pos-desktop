import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import "./index.css";

import ProductScreen from "./screens/products-screen.tsx";
import ErrorScreen from "./screens/error-screen.tsx";
import PosScreen from "./screens/pos-screen.tsx";
import ClientsScreen from "./screens/clients-screen.tsx";
import SalesScreen from "./screens/sales-screen.tsx";
import StocksScreen from "./screens/stocks-screen.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "",
        element: <PosScreen />,
      },
      {
        path: "products",
        element: <ProductScreen />,
      },
      {
        path: "sales",
        element: <SalesScreen />,
      },
      {
        path: "clients",
        element: <ClientsScreen />,
      },
      {
        path: "stock",
        element: <StocksScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
