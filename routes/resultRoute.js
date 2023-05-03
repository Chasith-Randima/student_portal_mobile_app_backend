const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");

router
  .route("/")
  .get(resultController.getAllResults)
  .post(resultController.createOneResult);

router
  .route("/:id")
  .get(resultController.getOneResult)
  .patch(resultController.updateOneResult)
  .delete(resultController.deleteOneResult);

module.exports = router;
