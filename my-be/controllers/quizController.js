const Quiz = require("../models/quizModel");
const handleFactory = require("./handleFactory");
const catchAsync = require("../utils/catchAsync");
const utils = require("../utils/util");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

class QuestionController {
  checkId = handleFactory.checkId(Quiz);

  setRoleCreate = catchAsync(async (req, res, next) => {
    if (req.user.role !== "user") {
      req.body.public = true;
    }
    req.body.user = req.user.id;
    next();
  });
  createQuiz = handleFactory.createOne(Quiz);

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
  getAllQuiz = handleFactory.getAll(Quiz);

  setUserUpdatePublic = catchAsync(async (req, res, next) => {
    req.body = utils.filterObj(req.body, "public");
    const quiz = await Quiz.findById(req.params.id).populate({
      path: "user",
    });
    if (quiz.user.role !== "user") {
      return next(
        new AppError("You do not have permission to edit this quiz.", 401)
      );
    }
    req.body.updatedAt = Date.now();
    next();
  });
  updateQuiz = handleFactory.updateOne(Quiz);

  setUserUpdate = catchAsync(async (req, res, next) => {
    req.body = utils.filterObj(
      req.body,
      "name",
      "description",
      "type",
      "file",
      "password",
      "active",
      "start",
      "expire",
      "questions",
    );
    req.body.updatedAt = Date.now();
    if(req.body.password)
    {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    
    const quiz = await Quiz.findById(req.params.id).populate({
      path: "user",
    });
    const user = await User.findById(req.user.id);
    if (user.role === "user") {
      if (req.user.id !== quiz.user.id) {
        return next(
          new AppError("You do not have permission to edit this quiz.", 401)
        );
      }
    } else {
      if (quiz.public === false) {
        return next(new AppError("This quiz does not exist", 401));
      }
    }
    next();
  });

  setUserDelete = catchAsync(async (req, res, next) => {
    // req.body.updatedAt = Date.now();
    const quiz = await Quiz.findById(req.params.id).populate({
      path: "user",
    });
    const user = await User.findById(req.user.id);
    if (user.role === "user") {
      if (req.user.id !== quiz.user.id || quiz.public === true) {
        return next(
          new AppError("You do not have permission to edit this quiz.", 401)
        );
      } else {
        next();
      }
    } else {
      if (quiz.public === false) {
        return next(new AppError("This quiz does not exist", 401));
      } else {
        if (quiz.user.role === "user") {
          const doc = await Quiz.findByIdAndUpdate(
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
  deleteQuestion = handleFactory.deleteOne(Quiz);
}
module.exports = new QuestionController();
