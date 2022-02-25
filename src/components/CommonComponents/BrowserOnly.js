/* Core */
import React from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default function BrowserOnly({ children, fallback }) {
  if (!ExecutionEnvironment.canUseDOM || children == null) {
    return fallback || null;
  }

  return <>{children()}</>;
}
