const Exam = require("../models/examModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOneExam = factory.createOne(Exam);
exports.getOneExam = factory.getOne(Exam);
// exports.getOneDoctor = factory.getOne(Doctor, [{ path: "appointments" }]);
exports.getAllExams = factory.getAll(Exam);
exports.updateOneExam = factory.updateOne(Exam);
exports.deleteOneExam = factory.deleteOne(Exam);
