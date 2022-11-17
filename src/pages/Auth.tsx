import { useLocation } from "react-router-dom";
import { withAuth } from "@hoc";

import "@stylesPages/Auth.scss";

import { SigninForm, SignupForm } from "@containers";

function Auth() {
  const { pathname } = useLocation();

  return (
    <section className="auth">
      <div className="auth__content">
        {pathname === "/signin" ? <SigninForm /> : <SignupForm />}
      </div>
    </section>
  );
}

export default withAuth(Auth);
