const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "User must have a title...Please add a title..."],
    },
    material: [String],

    module: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Module",
        // required: [true, "Appointment must belong to a hospital"],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Material = mongoose.model("Material", materialSchema);
module.exports = Material;
