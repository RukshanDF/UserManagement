const express = require("express");
const router = express.Router();
const gatewayController = require("../controllers/userController");

router
  .route("/")
  .get(gatewayController.getAllUser)
  .post(gatewayController.createNewUser)
  .put(gatewayController.updateUser)
  .delete(gatewayController.deleteUser);

router.route("/:id").get(gatewayController.getUser);

router
  .route("/update_opportunities")
  .post(gatewayController.add_opportunity)
  .put(gatewayController.update_opportunity)
  .delete(gatewayController.delete_opportunity);

module.exports = router;
