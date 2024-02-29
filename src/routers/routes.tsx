import { createHashRouter } from "react-router-dom";

import Layout from "../layout/app-layout.tsx";
import HomePage from "../pages/home-page.tsx";
import ProductPage from "../pages/products-page.tsx";
import ErrorPage from "../pages/error-page.tsx";
import PosPage from "../pages/pos-page.tsx";
import ClientsPage from "../pages/clients-page.tsx";
import SalesPage from "../pages/sales-page.tsx";
import StocksPage from "../pages/stocks-page.tsx";

const routes = createHashRouter([
  {
    path: "/",
    // element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        index: true,
      },
    ],
  },
  {
    path: "i",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "pos",
        element: <PosPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "sales",
        element: <SalesPage />,
      },
      {
        path: "clients",
        element: <ClientsPage />,
      },
      {
        path: "stock",
        element: <StocksPage />,
      },
    ],
  },
]);

export default routes;
