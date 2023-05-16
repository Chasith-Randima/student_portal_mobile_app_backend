const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lectureController");

router
  .route("/")
  .get(lectureController.getAllLectures)
  .post(lectureController.createOneLecture);

router
  .route("/:id")
  .get(lectureController.getOneLecture)
  .patch(lectureController.updateOneLecture)
  .delete(lectureController.deleteOneLecture);

module.exports = router;
