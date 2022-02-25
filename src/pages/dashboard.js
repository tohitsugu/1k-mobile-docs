/* Core */
import React from "react";
/* Components */
import BrowserOnly from "../components/CommonComponents/BrowserOnly";

export default function Dashboard() {
  return (
    <BrowserOnly>
      {() => {
        const Layout = require("../hoc/Layout").default;
        const DashboardPage = require("../components/Dashboard").DashboardPage;
        return (
          <Layout>
            <DashboardPage />
          </Layout>
        );
      }}
    </BrowserOnly>
  );
}
