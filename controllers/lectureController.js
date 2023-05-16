const Lecture = require("../models/lectureModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOneLecture = factory.createOne(Lecture);
exports.getOneLecture = factory.getOne(Lecture);
// exports.getOneDoctor = factory.getOne(Doctor, [{ path: "appointments" }]);
exports.getAllLectures = factory.getAll(Lecture);
exports.updateOneLecture = factory.updateOne(Lecture);
exports.deleteOneLecture = factory.deleteOne(Lecture);
