const express = require("express"); //express
const fileController = require("../controllers/fileController");
const authController = require("../controllers/authController");

const router = express.Router(); // express

router
  .route("/")
  .get(fileController.getAllFile)
  .post(authController.protect,fileController.uploadUserPhoto,fileController.createFile)

module.exports = router;
