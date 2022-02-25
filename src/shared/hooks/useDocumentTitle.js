import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useDocumentTitle = () => {
  const { tenantCommunityInfo } = useSelector((state) => state.auth);
  const title = tenantCommunityInfo?.tenant?.name;
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};
