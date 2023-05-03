const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");

router
  .route("/")
  .get(examController.getAllExams)
  .post(examController.createOneExam);

router
  .route("/:id")
  .get(examController.getOneExam)
  .patch(examController.updateOneExam)
  .delete(examController.deleteOneExam);

module.exports = router;
