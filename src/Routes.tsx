import { lazy, Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { Layout, LoaderPage } from "@components";

// import Home from "@pages/Home"; // Without lazy and Suspense
const Home = lazy(() => import("@pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      index: true,
      element: (
        <Suspense fallback={<LoaderPage />}>
          <Home />
        </Suspense>
      )
      // element: <Home />
      // 👆️ Without lazy and Suspense
    }]
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);

export default router;
