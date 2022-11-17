import { Navigate, createBrowserRouter } from "react-router-dom";
import endpoints from "@endpoints";
import { loaderApi } from "@services";

import type { ReturnConfigPsps } from "@typing/services";

import { ErrorBoundary, Layout } from "@components";

import Home from "@pages/Home";
import Auth from "@pages/Auth";
import Payment from "@pages/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [{
      index: true,
      element: <Home />
    }, {
      path: "signin",
      element: <Auth />
    }, {
      path: "signup",
      element: <Auth />
    }, {
      path: "payment/:id",
      element: <Payment />,
      loader: async ({ params, request }) => {
        const api = loaderApi();

        const configuration = api.get<ReturnConfigPsps[]>({
          endpoint: endpoints.psps_config,
          query: `?tpId=${params.id}&site=TRADERBOTIC&test=true`,
          punkaso: true,
          secure: false,
          signal: request.signal
        });

        return configuration;
      }
    }]
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
]);

export default router;
