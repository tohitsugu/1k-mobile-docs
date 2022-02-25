/* Core */
import React from "react";
/* Components */
import BrowserOnly from "../components/CommonComponents/BrowserOnly";

export default function Register() {
  return (
    <BrowserOnly>
      {() => {
        const Layout = require("../hoc/Layout").default;
        const RegisterPage = require("../components/Register").RegisterPage;
        return (
          <Layout isLogin={true} isRegister={true}>
            <RegisterPage />
          </Layout>
        );
      }}
    </BrowserOnly>
  );
}
