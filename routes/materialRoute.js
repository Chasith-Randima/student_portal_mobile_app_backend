const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");

router
  .route("/")
  .get(materialController.getAllMaterials)
  .post(materialController.createOneMaterial);

router
  .route("/:id")
  .get(materialController.getOneMaterial)
  .patch(materialController.updateOneMaterial)
  .delete(materialController.deleteOneMaterial);

module.exports = router;
