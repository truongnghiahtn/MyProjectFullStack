const express = require("express");
const questionController = require("../controllers/questionController");
const authController = require("../controllers/authController");

const router = express.Router();

router.param('id', questionController.checkId);

router.patch(
  "/public/:id",
  authController.protect,
  authController.restrictTo("admin", "manager"),
  questionController.setUserUpdatePublic,
  questionController.updateQuestion
); // những câu hỏi của user tạo mới được phép chỉnh quyền public
// chỉ có admin  có quyển public true -> false và false -> true và chỉ áp dung cho những câu hỏi do user tao

//user
// router.use(authController.restrictTo('admin'));
router
  .route("/")
  .post(
    authController.protect,
    questionController.setRoleCreate,
    questionController.createQuestion
  )
  .get(
    authController.protect,
    questionController.setUserGetAll,
    questionController.getAllQuestion
  );

//sửa thông tin câu hỏi -> user sửa những câu hỏi do mình tạo ra
// admin sửa dững câu hỏi mà public= true.

// xóa cấu hỏi -> user xóa câu hỏi của chính mình tạo ra
//=> amdin xóa những câu hỏi puplic =true. tuy nhiên nếu câu hỏi do user tạo ra thì câu hỏi chuyển về puplic = false
router
  .route("/:id")
  .patch(
    authController.protect,
    questionController.setUserUpdate,
    questionController.updateQuestion
  )
  .delete(
    authController.protect,
    questionController.setUserDelete,
    questionController.deleteQuestion
  )
  .get(
    authController.protect,
    questionController.getQuestion
  );

module.exports = router;
