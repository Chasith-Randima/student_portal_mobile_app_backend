const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");
const authController = require("../controllers/authController");

router.use("/file/:fileName", materialController.getMaterialFile);

router
  .route("/")
  .get(materialController.getAllMaterials)
  .post(
    authController.protect,
    materialController.uploadMaterialImages,
    materialController.createOneMaterial
  );

router
  .route("/:id")
  .get(materialController.getOneMaterial)
  .patch(materialController.updateOneMaterial)
  .delete(materialController.deleteOneMaterial);

module.exports = router;
