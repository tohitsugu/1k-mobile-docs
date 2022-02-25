/* Core */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
/* API */
import { verifyUserEmail, requestInvite } from "../../../api/requestAnInvite";
/* Actions */
import { authActions } from "../../Auth/actions";
/* Hooks */
import { useMountedState } from "../../../shared/hooks/useMountedState";
import { useShowMessage } from "../../../shared/hooks/useShowMessage";
/* config */
import { gcKeys } from "../../../shared/config";

export const useRequestAnInvite = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const isMounted = useMountedState();
  const { showMessage } = useShowMessage();

  const stopLoading = () => {
    if (isMounted()) {
      setLoading(false);
    }
  };

  const handleUsersWithSameUserName = () => {
    stopLoading();
    showMessage(
      "Unable to find a unique record. Please contact your administrator for further assistance.",
      "error"
    );
  };

  const handleUserIsNotFound = (selectedEmailType) => {
    stopLoading();
    return dispatch(
      authActions.showMessage({
        message: {
          show: true,
          title:
            selectedEmailType === "email2"
              ? "Secondary email address not found"
              : "Account not found",
          text:
            selectedEmailType === "email2"
              ? "We could not find a secondary email address associated with your account."
              : "We could not find an account that matches your email address. Please contact your administrator.",
          severity: "error",
        },
      })
    );
  };

  const handleUnknownError = (error) => {
    const errorMessage = error?.response?.data?.message;
    stopLoading();
    showMessage(errorMessage || "Something went wrong", "error", error);
  };

  const handleRequestInvite = (user, email, setFieldValue, token) => {
    const requestParams = {
      emailTo: email,
      user_token: user.user_token,
      google_token: token,
    };

    requestInvite(requestParams)
      .then(() => {
        stopLoading();
        dispatch(
          authActions.showMessage({
            message: {
              show: true,
              title: "Invitation sent",
              text: `An invitation to enroll in passwordless access has been sent to ${email}.`,
              severity: "success",
            },
          })
        );
        setShowUserName(false);
        setFieldValue("username", "");
      })
      .catch((error) => {
        handleUnknownError(error);
      });
  };

  const askUserToProvideUserName = () => {
    stopLoading();
    dispatch(
      authActions.showMessage({
        message: {
          show: true,
          title: "Multiple accounts found",
          text: `We found multiple accounts that match your email address. Please provide a username.`,
          severity: "error",
        },
      })
    );
    setShowUserName(true);
  };

  const checkSecondaryEmail = (user, setFieldValue, token) => {
    !!user.email2
      ? handleRequestInvite(user, user.email2, setFieldValue, token)
      : handleUserIsNotFound("email2");
  };

  const handleSubmitSuccess = (values, setFieldValue, token) => {
    const { email, emailType, username } = values;
    const params = {
      email,
    };

    verifyUserEmail(params)
      .then((res) => {
        const users = res?.data?.data?.users || [];
        const filteredUsers = users.filter(
          (user) =>
            user.email1?.toLowerCase() === email?.toLowerCase() &&
            (!showUserName ||
              !username ||
              user.username?.toLowerCase() === username?.toLowerCase())
        );

        const uniqueUserNames = new Set(
          filteredUsers.map((user) => user.username)
        );
        const foundUsersWithSameUserName =
          uniqueUserNames.size < filteredUsers.length;
        const userIsNotFound = !filteredUsers?.length;
        const onlyOneUserFound = filteredUsers?.length === 1;
        const foundUsersWithDifferentUserNames =
          uniqueUserNames.size > 1 &&
          (!showUserName || (showUserName && !username));

        if (foundUsersWithSameUserName) {
          handleUsersWithSameUserName();
        } else if (onlyOneUserFound) {
          emailType === "email1"
            ? handleRequestInvite(filteredUsers[0], email, setFieldValue, token)
            : checkSecondaryEmail(filteredUsers[0], setFieldValue, token);
        } else if (userIsNotFound) {
          handleUserIsNotFound(emailType);
        } else if (foundUsersWithDifferentUserNames) {
          askUserToProvideUserName();
        } else {
          handleUserIsNotFound();
        }
      })
      .catch((error) => {
        handleUnknownError(error);
      });
  };

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      gcKeys.pkey,
      `https://www.google.com/recaptcha/api.js?render=${gcKeys.pkey}`,
      function () {
        console.log("reCaptcha loaded!");
      }
    );

    return () => {
      // On component unmount, removes the reCaptcha.
      setTimeout(
        function () {
          const script = document.getElementById(gcKeys.pkey);
          if (script) {
            script.remove();
          }
          const recaptchaElems =
            document.getElementsByClassName("grecaptcha-badge");
          if (recaptchaElems && recaptchaElems.length) {
            recaptchaElems[0].remove();
          }
        },
        [1000]
      );
    };
  }, []);

  const handleSubmit = (values, { setFieldValue }) => {
    setLoading(true);
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(gcKeys.pkey, { action: "submit" })
        .then((token) => {
          token && handleSubmitSuccess(values, setFieldValue, token);
        });
    });
  };

  return { handleSubmit, loading, showUserName };
};
