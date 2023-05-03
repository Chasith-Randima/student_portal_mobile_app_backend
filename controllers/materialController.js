const Material = require("../models/materialModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOneMaterial = factory.createOne(Material);
exports.getOneMaterial = factory.getOne(Material);
// exports.getOneDoctor = factory.getOne(Doctor, [{ path: "appointments" }]);
exports.getAllMaterials = factory.getAll(Material);
exports.updateOneMaterial = factory.updateOne(Material);
exports.deleteOneMaterial = factory.deleteOne(Material);
