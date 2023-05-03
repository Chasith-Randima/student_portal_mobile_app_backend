const Result = require("../models/resultModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOneResult = factory.createOne(Result);
exports.getOneResult = factory.getOne(Result);
// exports.getOneDoctor = factory.getOne(Doctor, [{ path: "appointments" }]);
exports.getAllResults = factory.getAll(Result);
exports.updateOneResult = factory.updateOne(Result);
exports.deleteOneResult = factory.deleteOne(Result);
