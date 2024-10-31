import { useEffect } from "react";
import addNotification, { Notifications } from "react-push-notification";
import { useDispatch, useSelector } from "react-redux";
import { clearError, selectErrorMessage } from "../../redux/slices/errorSlice";

function Error(props) {
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      addNotification({
        title: errorMessage,
        duration: 4000,
        native: true, // when using native, your OS will handle theming.
      });
      dispatch(clearError());
    }
  }, [dispatch, errorMessage]);

  return <Notifications position="top-right" />;
}

export default Error;
