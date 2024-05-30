const express = require("express"); //express
const fileController = require("../controllers/fileController");
const authController = require("../controllers/authController");

const router = express.Router(); // express


router.post("/createFileDriver", authController.protect,fileController.createFileByDriver);
router
.route('/:id')
  .delete(authController.protect,fileController.setDeleteFile,fileController.deleteFile);

router
  .route("/")
  .get(authController.protect,fileController.setUserId,fileController.getAllFile)
  .post(authController.protect,fileController.uploadUserPhoto,fileController.createFile)

module.exports = router;
