const express = require(`express`);
const router = express.Router();
const authControl = require(`../controller/authController`);

router.route(`/signup`).post(authControl.signup);
router.route(`/login`).post(authControl.login);
router.route('/forgotpassword').post(authControl.forgotPassword);
router.route('/resetpassword/:token').post(authControl.resetPassword);
// router.route('/updatepassword').post(authControl.protect, authControl.updatePassword);

module.exports = router;