/* Core */
import React from "react";
/* Components */
import BrowserOnly from "../components/CommonComponents/BrowserOnly";

export default function Login() {
  return (
    <BrowserOnly>
      {() => {
        const Layout = require("../hoc/Layout").default;
        const LoginPage = require("../components/Auth").LoginPage;
        return (
          <Layout isLogin={true}>
            <LoginPage />
          </Layout>
        );
      }}
    </BrowserOnly>
  );
}
