/* Core */
import React from "react";
/* Components */
import BrowserOnly from "../components/CommonComponents/BrowserOnly";

export default function RequestAnInvite() {
  return (
    <BrowserOnly>
      {() => {
        const Layout = require("../hoc/Layout").default;
        const RequestAnInvitePage =
          require("../components/RequestAnInvite").RequestAnInvitePage;
        return (
          <Layout isLogin={true} isRegister={true}>
            <RequestAnInvitePage />
          </Layout>
        );
      }}
    </BrowserOnly>
  );
}
