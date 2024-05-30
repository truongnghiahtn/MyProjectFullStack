const Question = require("../models/questionModel");
const handleFactory = require("../controllers/handleFactory");
const catchAsync = require("../utils/catchAsync");
const utils = require("./../utils/util");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

class QuestionController {
  checkId = handleFactory.checkId(Question);
  setRoleCreate = catchAsync(async (req, res, next) => {
    if (req.user.role !== "user") {
      req.body.public = true;
    }
    req.body.user = req.user.id;
    next();
  });
  createQuestion = handleFactory.createOne(Question);

  setUserGetAll = (req, res, next) => {
    if (req.user.role !== "user") {
      if (req.filterObj) {
        req.filterObj = { ...req.filterObj, public: true };
      } else {
        req.filterObj = { public: true };
      }
    } else {
      if (req.filterObj) {
        req.filterObj = { ...req.filterObj, user: req.user.id };
      } else {
        req.filterObj = { user: req.user.id };
      }
    }
    next();
  };
  getAllQuestion = handleFactory.getAll(Question, [
    {
      path: "user",
      select: "userName -_id",
    },
    {
      path: "file",
      select: "url -_id type",
    },
  ]);

  getQuestion = handleFactory.getOne(Question, [
    {
      path: "user",
      select: "userName -_id",
    },
    {
      path: "file",
      select: "url -_id type",
    },
  ]);

  setUserUpdatePublic = catchAsync(async (req, res, next) => {
    req.body = utils.filterObj(req.body, "public");
    const question = await Question.findById(req.params.id).populate({
      path: "user",
    });
    if (question.user.role !== "user") {
      return next(
        new AppError("You do not have permission to edit this question.", 401)
      );
    }
    req.body.updatedAt = Date.now();
    next();
  });
  updateQuestion = handleFactory.updateOne(Question);

  setUserUpdate = catchAsync(async (req, res, next) => {
    req.body = utils.filterObj(
      req.body,
      "question",
      "description",
      "file",
      "url",
      "time",
      "answers"
    );
    req.body.updatedAt = Date.now();
    const question = await Question.findById(req.params.id).populate({
      path: "user",
    });
    const user = await User.findById(req.user.id);
    if (user.role === "user") {
      if (req.user.id !== question.user.id) {
        return next(
          new AppError("You do not have permission to edit this question.", 401)
        );
      }
    } else {
      if (question.public === false) {
        return next(new AppError("This question does not exist", 401));
      }
    }
    next();
  });

  setUserDelete = catchAsync(async (req, res, next) => {
    // req.body.updateAt = Date.now();
    const question = await Question.findById(req.params.id).populate({
      path: "user",
    });
    const user = await User.findById(req.user.id);
    if (user.role === "user") {
      if (req.user.id !== question.user.id || question.public === true) {
        return next(
          new AppError("You do not have permission to edit this question.", 401)
        );
      } else {
        next();
      }
    } else {
      if (question.public === false) {
        return next(new AppError("This question does not exist", 401));
      } else {
        if (question.user.role === "user") {
          const doc = await Question.findByIdAndUpdate(
            req.params.id,
            { public: false, updatedAt: Date.now() },
            {
              new: true,
              runValidators: true,
            }
          );
          res.status(204).json({
            status: "success",
          });
        } else {
          next();
        }
      }
    }
  });
  deleteQuestion = handleFactory.deleteOne(Question);
}
module.exports = new QuestionController();
