const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const Email = require("../utils/sendMail");
const crypto = require("crypto");
const utils = require("./../utils/util");

createSendToken = (
  user,
  statusCode,
  res,
  mess = "Your account has been successfully created"
) => {
  const token = utils.signJWT(user._id, process.env.EXP_JWT);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //token có hiệu lực 3 ngày
    ),
    httpOnly: true,
    // secure: true,
  };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    message: mess,
    data: {
      user,
    },
  });
};
class Auth {
  singUp = catchAsync(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(
        new AppError(
          "This email already exists. Please provide a new email",
          400
        )
      );
    }
    if (req.body.password !== req.body.passwordConfirm) {
      return next(
        new AppError(
          "password does not match passwordConfirm. Resend passwordConfirm",
          400
        )
      );
    }

    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    };
    const tokenUser = utils.signJWT(newUser, "10m");
    const url = `http://localhost:3000/active-user/${tokenUser}`;
    await new Email(newUser, url).sendWelcome();
    res.status(200).json({
      status: "success",
      message:
        "The token sent to you is valid for 10 minutes, check your email for verification",
      data: {},
    });
  });

  //---------------------------------------//

  activeUser = catchAsync(async (req, res, next) => {
    if (!req.body.token) {
      return next(new AppError("Please provide token.", 400));
    }
    const decoded = jwt.verify(req.body.token, process.env.KEY_JWT);
    const { userName, email, password, passwordConfirm, role } = decoded.data;
    const newUser = await User.create({
      userName,
      email,
      password,
      passwordConfirm,
      role,
    });
    newUser.password = undefined;
    res.status(201).json({
      status: "success",
      message: "Your account has been successfully created",
      data: {
        newUser,
      },
    });
  });

  login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password.", 400));
    }
    //
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError(`Can't find user`, 401));
    }

    const checkPassword = await user.checkPassword(password, user.password);
    if (!checkPassword) {
      return next(new AppError(`Password is not correct`, 401));
    }
    createSendToken(user, 200, res, "Logged in successfully");
  });

  //---------------------------------------//

  logOut = (req, res) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: "success" });
  };

  //---------------------------------------//

  protect = catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access", 401)
      );
    }
    // 2) check token
    const decoded = jwt.verify(token, process.env.KEY_JWT);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.data);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401
        )
      );
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    req.filterObj=null;
    res.locals.user = currentUser;
    next();
  });

  //---------------------------------------//

  restrictTo(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError("You do not have permission to perform this action", 403)
        );
      }
      next();
    };
  }

  //---------------------------------------//

  forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is no user with email address.", 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // // 3) Send it to user's email
    try {
      const resetURL = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError("There was an error sending the email. Try again later!"),
        500
      );
    }
  });

  //---------------------------------------//

  resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.updatedAt=Date.now();
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //4) log the user, send jwt
    createSendToken(user, 200, res);
  });

  //---------------------------------------//

  updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    if (!(await user.checkPassword(req.body.currentPassword, user.password))) {
      return next(new AppError("Your password current is not correct", 401));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.updatedAt=Date.now();
    await user.save();
    createSendToken(user, 200, res);
  });

  getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      message: "",
      data: {
        user,
      },
    });
  });
}

module.exports = new Auth();
