const express = require("express"); //express
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router(); // express

//auth
router.route("/signup").post(authController.singUp);
router.route("/active").post(authController.activeUser);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logOut);

router.route("/forgotPassword").post(authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.route("/getMe").get(authController.protect, authController.getMe);

//user
router.param("id", userController.checkId);
// router.use(authController.restrictTo('admin'));
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    userController.getAllUser
  );

router
  .route("/:id")
  .get(userController.getUser)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    userController.setUserPermission,
    userController.setUserUpdate,
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    userController.setUserPermission,
    userController.deleteUser
  );

module.exports = router;
