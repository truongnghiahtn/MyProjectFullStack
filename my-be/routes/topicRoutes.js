const express = require("express");
const topicController = require("../controllers/topicController");
const authController = require("../controllers/authController");

const router = express.Router();
router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    topicController.createTopic
  )
  .get(authController.protect, topicController.getAllTopic);

//sửa thông tin câu hỏi -> user sửa những câu hỏi do mình tạo ra
// admin sửa dững câu hỏi mà public= true.

// xóa cấu hỏi -> user xóa câu hỏi của chính mình tạo ra
//=> amdin xóa những câu hỏi puplic =true. tuy nhiên nếu câu hỏi do user tạo ra thì câu hỏi chuyển về puplic = false
router
  .route("/:id")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    topicController.setTopicUpdate,
    topicController.updateTopic
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    topicController.deleteTopic
  )
  .get(authController.protect, topicController.getTopic);

module.exports = router;
