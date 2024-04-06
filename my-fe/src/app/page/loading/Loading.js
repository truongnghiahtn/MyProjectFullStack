import { useEffect } from "react";
import $ from "jquery";
const Loading = ({ isloading = true }) => {
  useEffect(() => {
    if (!isloading) {
      setLoading();
    }
  }, [isloading]);

  const setLoading = () => {
    $(".page-loading__overlay").fadeOut(1000);
  };
  return (
    <div className="page-loading">
      <div className="page-loading__overlay" >
        <div className="page-loading__wrapper">
          <div className="page-loading__box"></div>
          <div className="page-loading__box"></div>
          <div className="page-loading__box"></div>
          <div className="page-loading__box"></div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
