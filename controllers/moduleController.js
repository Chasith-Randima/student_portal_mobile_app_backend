const Module = require("../models/moduleModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOneModule = factory.createOne(Module);
exports.getOneModule = factory.getOne(Module);
// exports.getOneDoctor = factory.getOne(Doctor, [{ path: "appointments" }]);
exports.getAllModules = factory.getAll(Module);
exports.updateOneModule = factory.updateOne(Module);
exports.deleteOneModule = factory.deleteOne(Module);
