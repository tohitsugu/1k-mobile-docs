/* Core */
import React from "react";
/* Components */
import BrowserOnly from "../components/CommonComponents/BrowserOnly";

export default function Register() {
  return (
    <BrowserOnly>
      {() => {
        const Layout = require("../hoc/Layout").default;
        const DemoPage = require("../components/Demo").DemoPage;
        return (
          <Layout isLogin={true} isRegister={true} isDemo={true}>
            <DemoPage />
          </Layout>
        );
      }}
    </BrowserOnly>
  );
}
