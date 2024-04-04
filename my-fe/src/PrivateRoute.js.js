import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
  if(false){
    return<Navigate to="/login"></Navigate>
  }
  return <>{children}</>;
};
export default PrivateRoute;
