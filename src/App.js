import React, { Suspense, lazy } from "react";
import InvoiceList from "./components/InvoiceList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { InvoiceProvider } from "./components/InvoiceContext";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import Error404 from "./components/Error404";
import "react-toastify/dist/ReactToastify.css";

/** LAZY LOADING */
const ImportInvoices = lazy(() => import("./components/ImportInvoices"));
const InvoiceWizard = lazy(() => import("./components/InvoiceWizard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <InvoiceList />,
      },
      {
        path: "import",
        element: (
          <Suspense fallback={<>LOADING.......</>}>
            <ImportInvoices />
          </Suspense>
        ),
      },
      {
        path: "create",
        element: (
          <Suspense fallback={<>LOADING.......</>}>
            <InvoiceWizard />
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <InvoiceProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </InvoiceProvider>
  );
}

export default App;
