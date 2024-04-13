import $ from "jquery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postActiveUser, setIsLoadingAuth } from "../../../redux/auth/auth";
import { useSelector, useDispatch } from "react-redux";
const PageActive = () => {
  const { token } = useParams();
  const [isActive, setIsActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("chay len nay");
    dispatch(setIsLoadingAuth());
    dispatch(postActiveUser({ token }));
    setIsActive(false);
    setIsSuccess(false);
  }, []);

  useEffect(() => {
    let refresher = $(".refresher");
    if (auth.isLoading) {
      refresher.addClass("loading");
      setIsActive(false);
    } else {
      refresher.removeClass("loading");
      setIsActive(true);

      if (auth.status === true) {
        refresher.addClass("success");
        setIsSuccess(true);
      } else if (auth.status === false) {
        refresher.addClass("error");
      }
    }
  }, [auth]);

  return (
    <>
      <div className="page-active">
        <div className="center">
          <div className="refresher">
            <svg className="icon-refresh" viewBox="0 0 32 32">
              <path d="M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z "></path>
            </svg>

            <svg className="icon-success" viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="36"></circle>
              <path
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="7"
                d="M17.7,40.9l10.9,10.9l28.7-28.7"
              ></path>
            </svg>

            <svg className="icon-error" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10"></circle>
              <polyline points="5 15, 15 5"></polyline>
              <polyline points="15 15, 5 5"></polyline>
            </svg>
          </div>
          {isActive && (
            <div className="page-active--status">
              {isSuccess === true ? (
                <p>You have successfully created an account</p>
              ) : (
                <p>You failed to create an account</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default PageActive;
