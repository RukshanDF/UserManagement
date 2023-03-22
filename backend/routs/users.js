const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createNewUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/:id").get(userController.getUser);
router.route("/deleteByMail").delete(userController.deleteUserByMail);
router
  .route("/update_opportunities")
  .post(userController.add_opportunity)
  .put(userController.update_opportunity)
  .delete(userController.delete_opportunity);

module.exports = router;
