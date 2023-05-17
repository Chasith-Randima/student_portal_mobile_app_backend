const Material = require("../models/materialModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req,file,cb) =>{

// }

// const storage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/materials");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     let fileExtention = originalname.split("/")[0];
//     let fname = `material-${req.user._id}-${Date.now()}-${1}.${fileExtention}`;
//     fname = fname.replace(/\s+/g, "-").toLowerCase();
//     req.body.material = fname;
//     // console.log(originalname.split("."));
//     cb(null, fname);
//   },
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/materials");
  },
  filename: (req, file, cb) => {
    // console.log(
    //   file.destination,
    //   file.fieldname,
    //   file.mimetype,
    //   file.originalname,
    //   file.size,
    //   file.buffer,
    //   file.stream
    // );
    console.log(req.body, "from multer .....................");
    console.log(req.material, "from multer .....................");
    const { originalname } = file;
    let fileExtention = originalname.split("/")[0];
    let fname = `material-${req.user._id}-${Date.now()}-${1}.${fileExtention}`;
    fname = fname.replace(/\s+/g, "-").toLowerCase();
    req.body.material = fname;
    // console.log(originalname.split("."));
    cb(null, fname);
  },
});

// const upload = multer({ storage });

// const multerStorage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     let fileExt = req.files.material[0].mimetype.split("/")[1];
//     const filename = `material-${req.user._id}-${Date.now()}-${1}.${fileExt}`;
//     console.log(filename);
//     cb(null, filename);
//   },
//   destination: (req, file, cb) => {
//     cv(null, `public/materials/`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an Image Please upload only an image..", 400), false);
//   }
// };

const upload = multer({
  storage: storage,
  //   dest:
  //   fileFilter: multerFilter,
});

exports.uploadMaterialImages = upload.fields([
  { name: "material", maxCount: 5 },
]);

// exports.resizeUserImages = catchAsync(async (req, res, next) => {
//   console.log(req.files.material[0].mimetype.split("/")[1]);
//   let fileExt = req.files.material[0].mimetype.split("/")[1];
//   //   console.log(req.files.mimetype.split("/")[1]);
//   if (!req.files.material) return next();

//   req.body.material = [];

//   await Promise.all(
//     req.files.material.map(async (file, i) => {
//       const filename = `material-${req.user._id}-${Date.now()}-${
//         i + 1
//       }.${fileExt}`;

//       await multer.diskStorage({
//         destination: `public/materials/`,
//         filename: filename,
//       });
//       // .single(filename);
//       //   await multer.diskStorage({ dest: `public/materials/` }).single(filename);

//       //   await sharp(file.buffer)
//       //     // .resize(2400, 1600)
//       //     // .toFormat("jpeg")
//       //     // .jpeg({ quality: 90 })
//       //     .toFile(`public/materials/${filename}`);

//       req.body.material.push(filename);
//     })
//   );

//   next();
// });

exports.getMaterialFile = catchAsync(async (req, res) => {
  let fileName = req.params.fileName;

  let options = {
    root: path.join(__dirname, "../public/materials"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

exports.materialDownload = (req, res) => {
  // const filePath = __dirname + "../public/materials" + req.params.fileName;
  const filePath = path.join(
    __dirname,
    `../public/materials/${req.params.fileName}`
  );

  res.download(
    filePath,
    req.params.fileName, // Remember to include file extension
    (err) => {
      if (err) {
        res.send({
          error: err,
          msg: "Problem downloading the file",
        });
      }
    }
  );
};

exports.createOneMaterial = factory.createOne(Material);
exports.getOneMaterial = factory.getOne(Material);
// exports.getOneDoctor = factory.getOne(Doctor, [{ path: "appointments" }]);
exports.getAllMaterials = factory.getAll(Material);
exports.updateOneMaterial = factory.updateOne(Material);
exports.deleteOneMaterial = factory.deleteOne(Material);
