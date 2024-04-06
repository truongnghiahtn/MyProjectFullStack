import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  const handleLink = e => {
    e.preventDefault()
    navigate('/', { replace: true })
  }
  return (
    <div className="pageNotFound">
      <div className="flex-container">
        <div className="text-center">
          <h1>
            <span className="fade-in" id="digit1">
              4
            </span>
            <span className="fade-in" id="digit2">
              0
            </span>
            <span className="fade-in" id="digit3">
              4
            </span>
          </h1>
          <h3 className="fadeIn">PAGE NOT FOUND</h3>
          <button onClick={handleLink} type="button" name="button">
            Return To Home
          </button>
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;
