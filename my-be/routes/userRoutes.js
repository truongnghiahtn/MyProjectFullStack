const express = require('express'); //express
const userController = require('../controllers/userController');

const router = express.Router(); // express

//auth

//user
// router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
