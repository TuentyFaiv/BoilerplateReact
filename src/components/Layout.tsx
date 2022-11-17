import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import type { LayoutProps } from "@typing/proptypes";

import "@stylesComponents/Layout.scss";

import { Header, Footer } from "@components";
import { withAuth } from "@hoc";

function Layout({ auth }: LayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header auth={auth} />
      <main className="layout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default withAuth(Layout, "component");
