/* Core */
import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
/* API */
import { putUserCreate } from "../../../api/register";
/* Actions */
import { authActions } from "../../Auth/actions";
/* Hooks */
import { useMountedState } from "../../../shared/hooks/useMountedState";
import { useShowMessage } from "../../../shared/hooks/useShowMessage";
/* Navigation */
import { links } from "../../../navigation/config";

export const useRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const isMounted = useMountedState();
  const { showMessage } = useShowMessage();

  const createUserSuccess = useCallback(
    (data) => {
      let message = {};
      let isError = false;
      if (data && data?.errors && data?.errors.length > 0) {
        let msgString = "";
        isError = true;
        data?.errors.map((item) => {
          return (msgString += item.errmsg + " ");
        });
        msgString = msgString.replace(
          "User is already exists.",
          "Email already exist"
        );
        message = {
          show: true,
          text: msgString,
          severity: "error",
        };
      } else {
        message = {
          show: true,
          title: "New account created",
          text: "Check your email for instructions to setup your new developer account. ",
          severity: "success",
        };
      }
      dispatch(
        authActions.showMessage({
          message,
        })
      );
      setTimeout(() => {
        !isError && history.push(`${links.root}`);
      }, 2500);
    },
    [dispatch]
  );

  const handleSubmit = (values) => {
    if (isMounted) {
      const { ...rest } = values;
      setLoading(true);

      const params = {
        firstname: rest.fname,
        lastname: rest.lastname,
        email1: rest.email,
        phone1: rest.phone,
      };
      putUserCreate(params)
        .then((res) => {
          const {
            data: { data },
          } = res;
          if (isMounted()) {
            createUserSuccess(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          let errorMessage = error?.response?.data?.message;
          if (isMounted()) {
            setLoading(false);
          }
          showMessage(errorMessage, "error");
        });
    }
  };

  return { handleSubmit, loading };
};
