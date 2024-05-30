const express = require("express");
const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");

const router = express.Router();

router.param('id', quizController.checkId);

router.patch(
  "/public/:id",
  authController.protect,
  quizController.setUserUpdatePublic,
  quizController.updateQuiz
); // những câu hỏi của user tạo mới được phép chỉnh quyền public
// chỉ có admin  có quyển public true -> false và false -> true và chỉ áp dung cho những câu hỏi do user tao

//user
// router.use(authController.restrictTo('admin'));
router
  .route("/")
  .post(
    authController.protect,
    quizController.setRoleCreate,
    quizController.createQuiz
  )
  .get(
    authController.protect,
    quizController.setUserGetAll,
    quizController.getAllQuiz
  );

//sửa thông tin câu hỏi -> user sửa những câu hỏi do mình tạo ra
// admin sửa dững câu hỏi mà public= true.

// xóa cấu hỏi -> user xóa câu hỏi của chính mình tạo ra
//=> amdin xóa những câu hỏi puplic =true. tuy nhiên nếu câu hỏi do user tạo ra thì câu hỏi chuyển về puplic = false
router
  .route("/:id")
  .patch(
    authController.protect,
    quizController.setUserUpdate,
    quizController.updateQuiz
  )
  .delete(
    authController.protect,
    quizController.setUserDelete,
    quizController.deleteQuestion
  );

module.exports = router;
