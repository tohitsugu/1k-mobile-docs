/* Core */
import { useState, useMemo, useEffect } from "react";
import jwt from "jwt-decode";
/* API */
import { getUserApiKey } from "../../../api/dashboard";
/* Hooks */
import { useMountedState } from "../../../shared/hooks/useMountedState";
import { useShowMessage } from "../../../shared/hooks/useShowMessage";
/* Services */
import sessionService from "../../../services/sessionService";
/* Config */
import * as config from "../config";

export const useDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [revealLicense, setRevealLicense] = useState(false);
  const [tenantInfo, setTenantInfo] = useState(false);
  const isMounted = useMountedState();
  const { showMessage } = useShowMessage();
  const token = sessionService.getToken();
  let tokeInfo = token !== null && token !== undefined ? jwt(token) : {};

  useEffect(() => {
    if (isMounted() && tenantInfo === false && token) {
      setLoading(true);
      setTenantInfo(null);

      getUserApiKey()
        .then((res) => {
          const {
            data: { data },
          } = res;
          if (isMounted()) {
            setTenantInfo(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.message;
          if (isMounted()) {
            setLoading(false);
          }
          if (errorMessage) {
            showMessage(errorMessage, "error", error);
          }
        });
    }
  }, [showMessage, isMounted, tenantInfo]);

  const initialValues = useMemo(() => {
    return (
      tenantInfo && {
        ...config.initialValues,
        apiKey: (revealLicense && tenantInfo?.apiKey) || "",
        tenantUrl: tenantInfo?.tenantUrl,
        tenantTag: tenantInfo?.tenantTag,
        communityName: tenantInfo?.communityName,
        error: tenantInfo?.error || "",
      }
    );
  }, [tenantInfo, revealLicense]);

  const handleContentClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleCopyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
  };

  const handleRevealLicense = (value) => {
    setRevealLicense(value);
  };

  return {
    handleContentClick,
    handleCopyToClipboard,
    loading,
    initialValues,
    tokeInfo,
    handleRevealLicense,
    revealLicense,
  };
};
