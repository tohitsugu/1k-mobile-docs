/* Core */
import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const useQuery = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const page = params.get("page");
  const size = params.get("size");
  const authModule = params.get("scheme") || "";
  const searchQuery = params.get("search") || "";
  const searchValue = searchQuery ? `&search=${searchQuery}` : "";
  const authModuleValue = authModule ? `&scheme=${authModule}` : "";

  const setPage = useCallback(
    (event, value) => {
      push(`?page=${value}&size=${size}${authModuleValue}${searchValue}`);
    },
    [push, size, searchValue, authModuleValue]
  );

  const setPageSize = useCallback(
    (event) => {
      push(
        `?page=${page}&size=${event.target.value}${authModuleValue}${searchValue}`
      );
    },
    [page, authModuleValue, push, searchValue]
  );

  const setAuthModule = useCallback(
    (event) => {
      push(`?page=1&size=${size}&scheme=${event.target.value}${searchValue}`);
    },
    [push, size, searchValue]
  );

  const setSearchQuery = useCallback(
    (value) => {
      push(`?page=1&size=${size}${authModuleValue}&search=${value}`);
    },
    [push, size, authModuleValue]
  );

  return {
    page: page ? Number(page) : 1,
    pageSize: size ? Number(size) : 25,
    searchQuery,
    authModule,
    setPage,
    setPageSize,
    setSearchQuery,
    setAuthModule,
  };
};
