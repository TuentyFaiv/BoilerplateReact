import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Layout as Styles } from "@cstyles";

import { Header, Footer } from "@components";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Styles.Main>
        <Outlet />
      </Styles.Main>
      <Footer />
    </>
  );
}
