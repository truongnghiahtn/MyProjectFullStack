const AppError = require("../utils/appError");

const handdleCastError = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handdleDuplicateFields = (err) => {
  const fieldErr = JSON.stringify(err.keyValue) || "??";
  const message = `Duplicate field value:${fieldErr}. Please use another value`;
  return new AppError(message, 400);
};

const handdleValidationError = (err) => {
  const message = err.message;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

  const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };
  
  const sendErrorProduct = (err, res) => {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else
      res.status(err.statusCode).json({
        status: 500,
        message: 'fail by server',
      });
  };

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // Có 3 lỗi chính từ mongodb.
    // 1.=> không đúng kiểu dữ liệu thường sảy ra _id hay name.
    // 2.=> duplicate(unique) sảy ra thường ở email hay name.
    // 3.=> lỗi validation sảy ra ở nhiều trường khác nhau.
    let error = new AppError(err.message, err.statusCode);
    //1.không đúng kiểu dữ liệu thường sảy ra _id hay name.
    if (err.name === "CastError") error = handdleCastError(err);
    //2 duplicate(unique) sảy ra thường ở email hay name.
    if (err.code === 11000) error = handdleDuplicateFields(err);
    //3 lỗi validation sảy ra ở nhiều trường khác nhau.
    if (err.name === "ValidationError") error = handdleValidationError(err);
    //4 lỗi token sai or hết hạn.
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProduct(error, res);
  }
};
