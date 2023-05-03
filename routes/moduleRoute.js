const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");

router
  .route("/")
  .get(moduleController.getAllModules)
  .post(moduleController.createOneModule);

router
  .route("/:id")
  .get(moduleController.getOneModule)
  .patch(moduleController.updateOneModule)
  .delete(moduleController.deleteOneModule);

module.exports = router;
