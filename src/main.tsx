/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { AppProvider, ServiceProvider } from "@context";
import { GlobalStyles } from "@styles";

import i18n from "./i18n";

import routes from "./routes";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <GlobalStyles />
    <ServiceProvider>
      <AppProvider>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={routes} />
        </I18nextProvider>
      </AppProvider>
    </ServiceProvider>
  </StrictMode>
);
