const handleFactory = require("../controllers/handleFactory");
const catchAsync = require("../utils/catchAsync");
const utils = require("./../utils/util");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

class UserController {
  checkId = handleFactory.checkId(User);

  getAllUser = handleFactory.getAll(User);

  getUser = handleFactory.getOne(User);

  setUserPermission = catchAsync(async (req, res, next) => {
    if (req.user.role === "manager") {
      const user = await User.findById(req.params.id);
      if (user.role !== "user") {
        return next(
          new AppError("You do not have permission to edit this user.", 401)
        );
      }
    }
    req.body.updatedAt = Date.now();
    next();
  });
  setUserUpdate = catchAsync(async (req, res, next) => {
    req.body = utils.filterObj(
      req.body,
      "role",
      "description",
      "phone",
      "address",
      "updatedAt",
      "userName"
    );
    next();
  });
  updateUser = handleFactory.updateOne(User);

  deleteUser = handleFactory.deleteOne(User);
}
module.exports = new UserController();
