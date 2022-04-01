const express = require(`express`);
const router = express.Router();
const recipieController = require('../controller/recipieController');
const authController = require('../controller/authController');

router.route('/')
    .get(recipieController.getAll)
    .post(recipieController.addRecipe)

router.route(`/:id`)
    .get(recipieController.getRecipeById)
    .patch(authController.protect, recipieController.patchRecipe)
    .delete(authController.protect, recipieController.deleteRecipie);

router.route('/review/:id')
    .post();

module.exports = router;