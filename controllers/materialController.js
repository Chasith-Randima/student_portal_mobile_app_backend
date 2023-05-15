const Material = require("../models/materialModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image Please upload only an image..", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  //   fileFilter: multerFilter,
});

exports.uploadUserImages = upload.fields([{ name: "images", maxCount: 5 }]);

exports.resizeUserImages = catchAsync(async (req, res, next) => {
  console.log(!req.files.images);
  if (!req.files.images) return next();

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `patient-${req.patient._id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2400, 1600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/patients/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.createOneMaterial = factory.createOne(Material);
exports.getOneMaterial = factory.getOne(Material);
// exports.getOneDoctor = factory.getOne(Doctor, [{ path: "appointments" }]);
exports.getAllMaterials = factory.getAll(Material);
exports.updateOneMaterial = factory.updateOne(Material);
exports.deleteOneMaterial = factory.deleteOne(Material);
